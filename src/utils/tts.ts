export function speakText(text: string) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR';
        window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech Synthesis API is not supported in this browser.");
    }
  }