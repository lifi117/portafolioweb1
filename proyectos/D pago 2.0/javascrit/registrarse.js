function checkPasswordStrength( $pass1, $pass2, $strengthResult, $submitButton, blacklistArray ) {
   var pass1 = $pass1.val();
   var pass2 = $pass2.val();
  
   // Reseteamos el botón enviar y el medidor
   $submitButton.attr( 'disabled', 'disabled' );
   $strengthResult.removeClass( 'short bad good strong mismatch' );
  
   // Comprobamos la lista negra de palabras
   blacklistArray = blacklistArray.concat( wp.passwordStrength.userInputBlacklist() )
  
   // Obtenemos la fortaleza de la constraseña
   var strength = wp.passwordStrength.meter( pass1, blacklistArray, pass2 );
 
   // En función de la fortaleza de la contraseña, añadimos una u otra clase al medidor
   switch ( strength ) {
     case 2:
       $strengthResult.addClass( 'bad' ).html( pwsL10n.bad );
       break;
  
     case 3:
       $strengthResult.addClass( 'good' ).html( pwsL10n.good );
       break;
 
     case 4:
       $strengthResult.addClass( 'strong' ).html( pwsL10n.strong );
       break;
  
     case 5:
       $strengthResult.addClass( 'mismatch' ).html( pwsL10n.mismatch );
       break;
 
     default:
       $strengthResult.addClass( 'short' ).html( pwsL10n.short );
   }
 
 //Sólo en el caso de que el campo repetir contraseña esté rellenado y siempre que el resultado sea distinto de 5, es decir, que coincidan las contraseñas, activaremos el botón de enviar
   if ( strength !== 5 && '' !== pass2.trim() ) {
     $submitButton.removeAttr( 'disabled' );
   }
  
   return strength;
 }
 
 jQuery(document).ready(function ($) {
   //Llamamos a la función de comprobar contraseña cada vez que escribimos en los inputs contraseña o repetir contraseña
   $( 'body' ).on( 'keyup', 'input[name=password], input[name=password_repeat]',
     function( event ) {
       checkPasswordStrength(
         $('input[name=password]'),
         $('input[name=password_repeat]'),
         $('#password-strength'), // Strength meter
         $('input[type=submit]'), // Submit button
         ['lista', 'negra', 'palabras'] // Lista negra de palabras
       );
     }
   );
 });