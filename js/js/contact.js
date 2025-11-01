document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const result = document.getElementById('contactResult');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('contactSubmit');
    btn.disabled = true;
    btn.textContent = 'Sending...';

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      // Free method using Google Apps Script
      const response = await fetch("https://script.google.com/macros/s/AKfycbybJv_PXsiM7XiObboTfR1z8znS6loz04lUFADtLA0Y_IVEyK8ccOxHu9_PKC4Si22_/exec", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        result.style.color = "#00ff99";
        result.textContent = "✅ Message sent successfully!";
        form.reset();
      } else {
        result.style.color = "#ff6666";
        result.textContent = "❌ Failed to send message. Try again.";
      }
    } catch (err) {
      result.style.color = "#ff6666";
      result.textContent = "⚠️ Network error. Try again.";
    } finally {
      btn.disabled = false;
      btn.textContent = "Send Message";
    }
  });
});
