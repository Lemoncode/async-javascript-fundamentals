// Si lo dejamos así no aparece, ningún texto. ¿Por qué? La razón es que todavía
// no se ha cargado el resto del documento, y que por tanto no existe el elemento
// div con id = content. Evidenetemente, esto es porque esta, cargado en la head.
// Lo que podemos hacer es un pequeño delay para que ese contenido este disponible.

// document.getElementById('content').innerHTML = 'Main content from JS';

// Now works
setTimeout(() => {
    document.getElementById('content').innerHTML = 'Main content from JS';
}, 100);

//
