document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    let response = document.getElementById("response");

    // ✅ Validation
    if (name === "" || email === "" || message === "") {
        response.innerText = "All fields are required.";
        return;
    }

    // ✅ Basic email check
    if (!email.includes("@")) {
        response.innerText = "Enter a valid email.";
        return;
    }

    // 🔐 XSS Prevention (sanitize input)
    function sanitize(input) {
        return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    name = sanitize(name);
    message = sanitize(message);

    // Simulate success
    response.innerText = "Message sent successfully!";
});
