<!-- google fontsame -->
<!-- root ile tanımlanmış renkleri aldık -->
numberı nasıl stringe çeviririz.
-tostring

previousElementSibling, JavaScript'te DOM (Document Object Model) API'sinin bir özelliğidir. Bir HTML öğesinin hemen önceki kardeş öğesini (sibling element) döndürür. Eğer önceki kardeş öğe yoksa veya önceki öğe bir element değilse (örneğin, bir metin düğümü veya yorum düğümü ise), null döner.
Örnek Kullanım
Aşağıda, previousElementSibling özelliğini nasıl kullanabileceğinizi gösteren birkaç örnek bulunmaktadır:

HTML Yapısı
html
Kodu kopyala
<div id="container">
  <p id="first">Birinci paragraf</p>
  <p id="second">İkinci paragraf</p>
  <p id="third">Üçüncü paragraf</p>
</div>
JavaScript
Bu yapıda, second ID'li paragrafın bir önceki kardeş öğesini almak istiyoruz:

javascript
Kodu kopyala
const secondParagraph = document.getElementById("second");
const previousSibling = secondParagraph.previousElementSibling;

console.log(previousSibling); // Bu, "Birinci paragraf" içeren <p> öğesini döndürecektir.
console.log(previousSibling.textContent); // Bu, "Birinci paragraf" metnini yazdıracaktır.# -shopping_list
