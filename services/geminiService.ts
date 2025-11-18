import { GoogleGenAI, Type } from "@google/genai";
import { EstimationFormData, EstimationResult, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const estimationSystemInstruction = `
Tu es un expert immobilier pour l'agence Laforêt Saint-Avertin. Ta zone de couverture est Saint-Avertin, Chambray-lès-Tours, Tours-Sud, Larçay, Veigné, et Esvres-sur-Indre.
Ta mission est de fournir une première estimation immobilière basée sur les informations fournies et les données de marché que tu trouveras via l'outil de recherche.

CONTRAINTES STRICTES ET NON NÉGOCIABLES :
1.  **Indice de Fiabilité** : Tu dois OBLIGATOIREMENT générer un \`indiceFiabilite\` aléatoire entre 30 et 40 (entier). C'est une limitation volontaire pour inciter à une visite physique. Ne dépasse JAMAIS 40.
2.  **Commentaire de Fiabilité** : Le champ \`commentaireFiabilite\` doit TOUJOURS contenir EXACTEMENT la phrase suivante : "Cette estimation présente un indice de confiance volontairement limité car de nombreux paramètres essentiels (état réel, luminosité, qualité des prestations) ne peuvent être évalués sans une visite sur place."
3.  **Calcul de la Fourchette** :
    a. Calcule une valeur moyenne (\`moyenne\`) réaliste pour le bien en te basant sur toutes les données.
    b. Calcule OBLIGATOIREMENT la fourchette basse comme \`basse = moyenne * 0.90\`.
    c. Calcule OBLIGATOIREMENT la fourchette haute comme \`haute = moyenne * 1.10\`.
    d. Toutes les valeurs (\`basse\`, \`moyenne\`, \`haute\`) doivent être des nombres entiers, arrondis au plus proche.
4.  **Analyse d'Environnement** : Génère un texte court (2-3 phrases) et pertinent sur le quartier/la localisation du bien (proximité écoles, commerces, transports, axes routiers, etc.). Sois spécifique à la zone de l'adresse fournie.
5.  **Format de Sortie** : La réponse doit être UNIQUEMENT un objet JSON valide, sans aucun texte avant ou après, et sans démarqueurs de code comme \`\`\`json.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        estimation: {
            type: Type.OBJECT,
            properties: {
                basse: { type: Type.INTEGER },
                moyenne: { type: Type.INTEGER },
                haute: { type: Type.INTEGER },
                indiceFiabilite: { type: Type.INTEGER }
            },
            required: ["basse", "moyenne", "haute", "indiceFiabilite"]
        },
        analyseEnvironnement: { type: Type.STRING },
        commentaireFiabilite: { type: Type.STRING }
    },
    required: ["estimation", "analyseEnvironnement", "commentaireFiabilite"]
};


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
    - Parking : ${formData.parking || 'N/A'}

    Veuillez fournir l'estimation en respectant toutes les contraintes du prompt système.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
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
        console.error("Failed to parse Gemini JSON response:", response.text);
        throw new Error("Invalid JSON response from API");
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
    const chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: chatbotSystemInstruction
        },
    });

    // We only need the last message from the user to send.
    // In a more complex scenario, we would format the history.
    const lastUserMessage = history[history.length - 1].text;
    const result = await chat.sendMessage({ message: lastUserMessage });
    return result.text;
};