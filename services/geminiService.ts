import { GoogleGenAI, Content } from "@google/genai";
import { EstimationFormData, EstimationResult, ChatMessage } from "../types";

// FIX: Use process.env as required by the execution environment to fix runtime error.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const estimationSystemInstruction = `
Tu es un expert immobilier d'élite pour l'agence Laforêt Saint-Avertin. Ta zone de couverture est Saint-Avertin, Chambray-lès-Tours, Tours-Sud, Larçay, Veigné, et Esvres-sur-Indre.
Ta mission est de fournir une première estimation immobilière enrichie, crédible et utile, basée sur les informations fournies et les données de marché que tu trouveras via l'outil de recherche.

**RÈGLES IMPÉRATIVES :**
1.  **Format de Sortie :** Tu dois OBLIGATOIREMENT retourner un objet JSON valide, sans aucun texte avant ou après, et sans démarqueurs de code comme \`\`\`json.
2.  **Structure JSON :** Le JSON doit impérativement respecter la structure suivante :
    {
      "estimation_low": number,
      "estimation_mid": number,
      "estimation_high": number,
      "price_m2_estimated": number,
      "price_m2_sector": number,
      "sector_trend_12m": "hausse" | "baisse" | "stable",
      "environment_analysis": {
        "schools": "string (ex: 'À proximité immédiate')",
        "transport": "string (ex: 'Accès facile aux lignes de bus')",
        "shops": "string (ex: 'Commerces à moins de 5 min')",
        "sector_attractiveness": "string (ex: 'Forte' ou 'Recherché')",
        "population_type": "string (ex: 'Mixte, familles et jeunes actifs')",
        "recent_sales_summary": "string (courte description textuelle)"
      },
      "strengths": ["string"],
      "weaknesses": ["string"],
      "potential": ["string"],
      "property_characteristics": {
        "vis_a_vis": "string", "vue_quality": "string", "luminosite": "string", "exposition": "string",
        "nuisances_sonores": "string", "proximite_axes": "string", "travaux_niveau": "string",
        "travaux_details": "string", "exterieur_qualite": "string", "vis_a_vis_jardin": "string",
        "stationnement_type": "string"
      },
      "reliability_score": number,
      "synthesis": "string"
    }
3.  **Calculs Stricts :**
    -   Calcule une valeur moyenne (\`estimation_mid\`) réaliste et justifiée.
    -   \`estimation_low\` DOIT être \`estimation_mid * 0.9\`.
    -   \`estimation_high\` DOIT être \`estimation_mid * 1.1\`.
    -   Toutes les estimations de prix doivent être des nombres entiers.
4.  **Score de Fiabilité (\`reliability_score\`) :**
    -   RÈGLE MÉTIER ABSOLUE : Le score doit TOUJOURS être compris entre 25 et 55.
    -   Ne JAMAIS générer un score supérieur à 55, même si toutes les informations semblent complètes.
    -   Cette limitation est due au manque d'informations qu'une visite physique peut seule combler (état réel, luminosité, nuisances, ventes off-market, etc.).
    -   Justifie un score plus bas (vers 25) si les données sont imprécises, incomplètes ou si le bien est atypique.
5.  **Analyse de l'Environnement :** Utilise l'adresse pour fournir des informations LOCALES et PERTINENTES. Sois concis et factuel.
6.  **Points Forts/Faibles/Potentiel :** Identifie 2 à 3 points clés pour chaque catégorie en te basant sur TOUTES les caractéristiques du bien.
7.  **Synthèse :** Génère une phrase de conclusion percutante qui résume le positionnement du bien, en intégrant l'impact des caractéristiques d'affinage. Exemple : "Grâce à son excellente luminosité et son grand jardin, votre bien se positionne favorablement sur le marché, bien que des travaux de rafraîchissement soient à considérer."
8.  **Prise en compte des caractéristiques d'affinage :** Utilise IMPÉRATIVEMENT les informations détaillées suivantes pour affiner l'estimation, les points forts/faibles et la synthèse. Ces éléments ont un impact direct sur la valeur :
    -   vis_a_vis, vue_quality, luminosite, exposition, nuisances_sonores, proximite_axes, travaux_niveau, travaux_details, exterieur_qualite, vis_a_vis_jardin, stationnement_type.
    -   Exemples d'impact : un vis-à-vis fort ou des nuisances importantes diminuent la valeur. Une vue exceptionnelle, une exposition sud ou un grand jardin qualitatif l'augmentent. L'absence de stationnement est un point faible notable. Des travaux importants diminuent significativement la valeur.

Ne dévie JAMAIS de ces règles. La qualité et la structure de ta réponse sont primordiales.
`;

export const getRealEstateEstimation = async (formData: EstimationFormData): Promise<EstimationResult> => {
  const prompt = `
    Voici les détails d'un bien à estimer :
    - Adresse : ${formData.address}
    - Type : ${formData.propertyType}
    - Surface habitable : ${formData.livingArea} m²
    - Surface terrain : ${formData.landArea || 'N/A'} m²
    - Étage : ${formData.floor || 'N/A'}
    - Nombre de pièces : ${formData.rooms}
    - Nombre de chambres : ${formData.bedrooms}
    - Année de construction : ${formData.buildYear}
    - État général : ${formData.condition}
    - Qualité des prestations : ${formData.featuresQuality}

    Caractéristiques d'affinage :
    - Vis-à-vis direct : ${formData.vis_a_vis || 'Non précisé'}
    - Qualité de la vue : ${formData.vue_quality || 'Non précisé'}
    - Exposition principale : ${formData.exposition || 'Non précisé'}
    - Luminosité : ${formData.luminosite || 'Non précisé'}
    - Nuisances sonores : ${formData.nuisances_sonores || 'Non précisé'}
    - Proximité d'axes passants : ${formData.proximite_axes || 'Non précisé'}
    - Travaux à prévoir : ${formData.travaux_niveau || 'Non précisé'}
    - Détails travaux : ${formData.travaux_details || 'Aucun'}
    - Qualité de l'extérieur : ${formData.exterieur_qualite || 'Non précisé'}
    - Vis-à-vis dans le jardin : ${formData.vis_a_vis_jardin || 'Non précisé'}
    - Stationnement : ${formData.stationnement_type || 'Non précisé'}

    Veuillez fournir l'estimation en respectant toutes les contraintes du prompt système.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: prompt,
        config: {
            systemInstruction: estimationSystemInstruction,
            tools: [{ googleSearch: {} }]
        },
    });

    try {
        const text = response.text.trim();
        // Handle potential markdown ```json ``` markers
        const jsonText = text.replace(/^```json\s*/, '').replace(/```$/, '');
        const data = JSON.parse(jsonText);
        return data as EstimationResult;
    } catch (e) {
        console.error("Failed to parse Gemini JSON response:", response.text, e);
        throw new Error("Réponse invalide de l'API d'estimation.");
    }
};


const chatbotSystemInstruction = `
Tu es un assistant virtuel pour l'agence immobilière Laforêt Saint-Avertin.
Ton rôle est d'être amical, professionnel et serviable.
Tu peux répondre aux questions sur :
- Le processus d'estimation immobilière.
- Le processus de vente d'un bien.
- Les secteurs que l'agence couvre (Saint-Avertin, Chambray-lès-Tours, Tours-Sud, Larçay, Veigné, Esvres-sur-Indre).
- Le fonctionnement de l'agence Laforêt.
Garde tes réponses concises et claires. Si tu ne connais pas la réponse, dis-le poliment et suggère de contacter l'agence directement au 02 46 46 63 80.
`;

export const chatWithBot = async (history: ChatMessage[]): Promise<string> => {
    // FIX: The previous implementation created a new chat session for every message, losing conversation context.
    // This version passes the conversation history to maintain context.
    const geminiHistory: Content[] = history.slice(0, -1).map(msg => ({
        parts: [{ text: msg.text }],
        role: msg.sender === 'user' ? 'user' : 'model'
    }));

    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: chatbotSystemInstruction
        },
        history: geminiHistory,
    });
    
    const lastUserMessage = history[history.length - 1].text;
    const result = await chat.sendMessage({ message: lastUserMessage });
    return result.text;
};
