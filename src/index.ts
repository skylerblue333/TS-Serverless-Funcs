import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

/**
 * Image processing serverless function
 */
export const processImageHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));
    
    // Parse request body
    const body = event.body ? JSON.parse(event.body) : {};
    const { imageUrl, width, height } = body;
    
    if (!imageUrl) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing imageUrl parameter" })
      };
    }
    
    console.log(`Processing image ${imageUrl} to ${width}x${height}...`);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        message: "Image processed successfully",
        processedUrl: `https://cdn.example.com/processed/${Math.random().toString(36).substring(7)}.jpg`,
        dimensions: { width, height }
      })
    };
  } catch (error) {
    console.error("Error processing image:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error during image processing" })
    };
  }
};