export const detectVoiceScam = async (text) => {
  try {
    const response = await fetch("http://127.0.0.1:5001/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
};