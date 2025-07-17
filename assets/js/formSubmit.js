jQuery(document).ready(function ($) {
    var successMessage = `<i class="fa fa-info-circle"></i><b class="success-message">Succès:</b> Votre demande est envoyée avec succès`;
    var ErrorMessage = `<i class="fa fa-info-circle"></i><b class="error-message">Erreur:</b> Veuillez vérifier vos données d'entrée`;
    // var checkbox = document.querySelector('input[name="condition"]');
    // var checkboxError = document.getElementById('checkboxError');
  
    $("#contactForm").on("submit", function (e) {
      sendFormData(e, "#contactForm", "contact");
    });
  
    $("#devisForm").on("submit", function (e) {
      sendFormData(e, "#devisForm", "devis");
    });
  
    function sendFormData(e, id, type) {
      e.preventDefault();
      
      const recaptchaInput = document.getElementById(`g-recaptcha-response-${type}`) || 
                            document.querySelector(`${id} input[name="g-recaptcha-response"]`);
      
      if (!recaptchaInput || !recaptchaInput.value) {
        alert("Veuillez vérifier le reCAPTCHA");
        return false;
      }
  
      const token = recaptchaInput.value;
  
      // Pour reCAPTCHA v3, on fait confiance au token côté client
      // La vérification se fait côté serveur
      if (token && token.length > 0) {
        submitForm();
      } else {
        alert("Erreur de validation reCAPTCHA. Veuillez réessayer.");
        return false;
      }
  
      function submitForm() {
        // Détecter si c'est un formulaire Formspree
        const formElement = document.querySelector(id);
        const isFormspree = formElement && formElement.action && formElement.action.includes('formspree.io');
        
        if (isFormspree) {
          // Pour Formspree, soumission directe du formulaire
          console.log("Formulaire Formspree détecté, soumission directe...");
          formElement.submit();
          return;
        }
        
        // Sinon, utiliser AJAX pour les autres formulaires
        $.ajax({
          url: $(id)[0]["action"],
          type: "POST",
          data: $(id).serialize(),
          datatype: "json",
          success: function (data, response, message) {
            console.log("Formulaire envoyé avec succès");
            
            if (type === "contact") {
              const responseDiv = e.target.querySelector("#contact-form-response");
              if (responseDiv) {
                responseDiv.classList.add("success");
                responseDiv.innerHTML = successMessage;
                responseDiv.style.display = "block";
              }
            }
            if (type === "devis") {
              const responseDiv = e.target.querySelector("#devis-form-response");
              if (responseDiv) {
                responseDiv.classList.add("success");
                responseDiv.innerHTML = successMessage;
                responseDiv.style.display = "block";
              }
            }
            
            // Redirection après délai
            setTimeout(() => {
              window.location.href = "/message-envoye";
            }, 1500);
          },
          error: function (jqXHR, textStatus, errorThrown) {
            console.error("Erreur lors de l'envoi:", textStatus);
            
            if (type === "contact") {
              const responseDiv = e.target.querySelector("#contact-form-response");
              if (responseDiv) {
                responseDiv.classList.add("error");
                responseDiv.innerHTML = ErrorMessage;
                responseDiv.style.display = "block";
              }
            }
            if (type === "devis") {
              const responseDiv = e.target.querySelector("#devis-form-response");
              if (responseDiv) {
                responseDiv.classList.add("error");
                responseDiv.innerHTML = ErrorMessage;
                responseDiv.style.display = "block";
              }
            }
          },
        });
      }
    }
    // $("#clone_g_re_captcha").html($("#g_re_captcha").clone(true, true));
    $("#contact-form").prop("disabled", true);
  });
  
  // reCAPTCHA v3 ne nécessite pas de callback spécial
  // Le token est automatiquement généré et envoyé avec le formulaire