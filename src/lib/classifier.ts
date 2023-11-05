export default async function HuggingFace(imageUrl: string) {

    try {
        // console.log(process.env.HUGGINGFACE_API_TOKEN);
        
        const response = await fetch("https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: imageUrl,
            }
        );
        const result = await response.json();
        return JSON.stringify(result);        
    } catch (error) {
        console.log(error);
    }

}


