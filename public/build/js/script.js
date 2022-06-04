document.addEventListener('DOMContentLoaded',()=>{
    iniciarApp();
})
function iniciarApp(){
    menuResponsive();
    mostrarProductos()
    //calcularAnchoPantalla();
    validarFormulario();
    mensajeContacto();
    crearContenedorVentanaEmergente();
    menuFixed();
    
    
    
}
//Responsive para barra de navegación
function menuResponsive(){
    let menu = document.querySelector(".contenedor-icono");
    let enlaces = document.querySelector('.menu');
    menu.addEventListener('click',()=>{
        enlaces.classList.toggle('ocultar');
        //enlaces.style.backgroundColor = "red";
    });
    
}

function menuFixed(){
    let nav = document.querySelector('.nav');
    window.addEventListener('scroll',(e)=>{
        let scrollY = this.scrollY;
        if(scrollY >= 140){
            nav.classList.add('menu-sticky');
            
        }else{
            nav.classList.remove('menu-sticky');
            
        }
    });
    
}


//Creando funcion asincrona para mostrar los productos de un json
async function mostrarProductos(){
    try{
        const url = 'http://127.0.0.1:5500/public/build/js/productos.json';
        //const url = 'https://cafeteria-almajluf.netlify.app/public/build/js/productos.json';
        const resultado = await fetch(url);        
        const db = await resultado.json();
        
        //Generar el HTML
        let productos = Object.entries(db);
        
        productos.forEach(categoriaProductos => {
            
            categoriaProductos[1].forEach(producto => {
                
                const mainProductos = document.querySelector('.productos');
                
                // seccion producto
                const sectionProducto = document.createElement('DIV');
                /* ----- producto ----- */
                sectionProducto.classList.add('producto');
                mainProductos.appendChild(sectionProducto);

                let {id,nombre,img,descripcion} = producto;
                if(producto.size){
                    let size = producto.size;
                }
                if(producto.precio){
                    let precio = producto.precio;
                }
                if(producto.porcion){
                    let porcion = producto.porcion;
                }
                if(producto.version){
                    let version = producto.version;
                }

                if(producto.img){
                    //imagen producto
                    const contenedorImagen = document.createElement('DIV');
                    const imagenProducto = document.createElement('IMG');
                    /* ----- imagen producto ----- */
                    contenedorImagen.classList.add('producto__imagen');
                    imagenProducto.setAttribute('src',producto.img);
                    imagenProducto.setAttribute('alt',producto.descripcion);
                    imagenProducto.setAttribute('loading','lazy');
                    sectionProducto.appendChild(contenedorImagen);
                    contenedorImagen.appendChild(imagenProducto);
                }

                if(producto.nombre){
                    //nombre producto
                    const nombreProducto = document.createElement('H3');
                    
                    /* ----- nombre producto ----- */
                    nombreProducto.textContent = producto.nombre;
                    nombreProducto.classList.add('producto__nombre');
                    sectionProducto.appendChild(nombreProducto);
                }
                const contenedorProductoPrecio = document.createElement('DIV');
                const productoPrecio = document.createElement('P');
                if(producto.precio){
                    //Producto precio
                    
                    contenedorProductoPrecio.classList.add('producto__precio');
                    sectionProducto.appendChild(contenedorProductoPrecio);
                    /* ----- precios producto ----- */
                    
                    if(producto.precio[0]){
                        
                        let contador = 0;
                        producto.precio.forEach( precio =>{
                            //console.log(precio);
                            if(contador === 0){
                                productoPrecio.textContent = '$ '+precio;
                                contenedorProductoPrecio.appendChild(productoPrecio);
                            }
                            contador++;
                            
                        });
                    }else{
                        contenedorProductoPrecio.classList.add('producto__precio');
                        sectionProducto.appendChild(contenedorProductoPrecio);
                        productoPrecio.textContent = `$ ${producto.precio}`;
                        contenedorProductoPrecio.appendChild(productoPrecio);
                        
                    }
                }
                const contenedorProductoPorcion = document.createElement('DIV');
                const productoPorcion = document.createElement('P');
                if(producto.porcion){
                    contenedorProductoPorcion.classList.add('producto__porcion');
                    sectionProducto.appendChild(contenedorProductoPorcion);
                    /* ----- porciones de cafeteras ----- */
                    
                    let contador = 0;
                        producto.porcion.forEach( porcion => {
                            if(contador === 0){
                                productoPorcion.textContent = '('+porcion+')';
                                contenedorProductoPorcion.appendChild(productoPorcion);
                            };
                            contador++;
                        })
                    
                }
                if(producto.version){
                    let contador = 0;
                    const contenedorVersion = document.createElement('FORM');
                    /* ----- version café ----- */
                    contenedorVersion.classList.add('producto__version');
                    sectionProducto.appendChild(contenedorVersion);

                    producto.version.forEach(version => {
                        let contenedorLabelInput = document.createElement('DIV');
                        contenedorLabelInput.classList.add('contenedorLabelInputVersion');
                        contenedorVersion.appendChild(contenedorLabelInput);

                        let label = document.createElement('LABEL');
                        let input = document.createElement('INPUT');
                        label.setAttribute('for',version + producto.id);
                        input.setAttribute('type','radio');
                        input.setAttribute('name','version');
                        input.setAttribute('id',version + producto.id);

                        if(contador === 0){
                            input.setAttribute('checked','');
                            input.setAttribute('data-id',0);
                            label.textContent = 'Sin cardamomo';
                        }
                        if(contador === 1){
                            input.setAttribute('data-id',1);
                            label.textContent = 'Medio cardamomo';
                        }
                        if(contador === 2){
                            input.setAttribute('data-id',2);
                            label.textContent = 'Extra cardamomo';
                        }
                        input.addEventListener('click',e =>{
                            productoPrecio.textContent = '$ ' + producto.precio[input.getAttribute('data-id')];
                        });

                        contenedorLabelInput.appendChild(label);
                        contenedorLabelInput.appendChild(input);
                        contador++;
                    });
                }
                if(producto.size){
                    let contador = 0;
                    const contendorSize = document.createElement('FORM');
                    /* ----- tamaños producto ----- */
                    contendorSize.classList.add('producto__size');
                    sectionProducto.appendChild(contendorSize);

                    producto.size.forEach( size => {
                        let contenedorLabelInput = document.createElement('DIV');
                        contenedorLabelInput.classList.add('contenedorLabelInputSize');
                        contendorSize.appendChild(contenedorLabelInput);

                        let label = document.createElement('LABEL');
                        let input = document.createElement('INPUT');
                        label.setAttribute('for',size + producto.id);
                        input.setAttribute('type','radio');
                        input.setAttribute('name','size');
                        input.setAttribute('id',size + producto.id);
                        
                        if(contador === 0){
                            input.setAttribute('checked','');
                            input.setAttribute('data-id',0);
                            label.textContent = 'Pequeña';
                        }
                        if(contador === 1){
                            input.setAttribute('data-id',1);
                            label.textContent = 'Mediana';
                        }
                        if(contador === 2){
                            input.setAttribute('data-id',2);
                            label.textContent = 'Grande';
                        }
                        input.addEventListener('click',e =>{
                            
                            productoPrecio.textContent = '$ ' + producto.precio[input.getAttribute('data-id')];
                            productoPorcion.textContent = '('+ producto.porcion[input.getAttribute('data-id')] + ')';
                        });

                        contenedorLabelInput.appendChild(label);
                        contenedorLabelInput.appendChild(input);
                        contador++;
                    } );
                }

                

                if(producto.descripcion){
                    

                    //descripcion producto
                    const contenedorProductoDescripcion = document.createElement('DIV');
                    const productoDescripcion = document.createElement('P');
                    /* ----- descripcion producto ----- */
                    contenedorProductoDescripcion.classList.add('producto__descripcion');
                    //productoDescripcion.textContent = `Descripción: ${descripcion}`;
                    productoDescripcion.innerHTML = `<span>Descripción:</span> ${producto.descripcion}`;
                    sectionProducto.appendChild(contenedorProductoDescripcion);
                    contenedorProductoDescripcion.appendChild(productoDescripcion);
                }

            })
            
        });
        // traducirSize();
        
    }catch (error){
        // console.log(error);
    }
    
    
    
    // API para hablar
    // let texto = "b";
    // const hablar = (texto) => speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
    // hablar(texto);
}

function traducirSize(){
    let labelSize = document.querySelectorAll('.label--size');
    labelSize.forEach(label => {
        console.log(label);
        if(label.lastChild.value === 'small'){
            label.textContent = 'Pequeña';
        }else if(label.lastChild.value === 'medium'){
            label.textContent = 'Mediana';
        }else if(label.lastChild.value === 'big'){
            label.textContent = 'Grande';
        }
        
    })
}


//Validacion del formulario de Contacto
function validarFormulario(){
    validarCampoNombre();
    validarCampoApellido();
    validarCampoTelefono();
    validarCampoMensaje();
}
function validarCampoNombre(){
    let inputNombre = document.querySelector('#nombre');
    let bloqueInfo = document.querySelector('#bloque-nombre');
    inputNombre.addEventListener('input', (e) =>{
        let nombre = e.target.value.trim();
        
        if(nombre.match(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/)){
            bloqueInfo.classList.add('valido');
            bloqueInfo.classList.remove('no--valido');
        }else{
            bloqueInfo.classList.add('no--valido');
            bloqueInfo.classList.remove('valido');
        }
        if(nombre === ''){
            bloqueInfo.classList.remove('no--valido');
            bloqueInfo.classList.remove('valido');
        }

    });
}
function validarCampoApellido(){
    let inputApellido = document.querySelector('#apellido');
    
    let bloqueInfo = document.querySelector('#bloque-apellido');
    inputApellido.addEventListener('input', (e) =>{
        let apellido = e.target.value.trim();
        if(apellido.match(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/)){
            bloqueInfo.classList.add('valido');
            bloqueInfo.classList.remove('no--valido');
        }else{
            bloqueInfo.classList.add('no--valido');
            bloqueInfo.classList.remove('valido');
        }
        if(apellido === ''){
            bloqueInfo.classList.remove('no--valido');
            bloqueInfo.classList.remove('valido');
        }

    });
}
function validarCampoTelefono(){
    let inputTelefono = document.querySelector('#telefono');
    
    let bloqueInfo = document.querySelector('#bloque-telefono');
    inputTelefono.addEventListener('input', (e) =>{
        let telefono = e.target.value.trim();
        if(telefono.match(/^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/)){
            bloqueInfo.classList.add('valido');
            bloqueInfo.classList.remove('no--valido');
        }else{
            bloqueInfo.classList.add('no--valido');
            bloqueInfo.classList.remove('valido');
        }
        if(telefono === ''){
            bloqueInfo.classList.remove('no--valido');
            bloqueInfo.classList.remove('valido');
        }

    });
}
function validarCampoMensaje(){
    let inputMensaje = document.querySelector('#mensaje');
    let bloqueInfo = document.querySelector('#bloque-mensaje');
    inputMensaje.addEventListener('input', (e) =>{
        let mensaje = e.target.value.trim();
        if(mensaje.trim() && (mensaje.length > 4 && mensaje.length < 250)){
            bloqueInfo.classList.add('valido');
            bloqueInfo.classList.remove('no--valido');
        }else{
            bloqueInfo.classList.add('no--valido');
            bloqueInfo.classList.remove('valido');
        }
        if(mensaje === ''){
            bloqueInfo.classList.remove('no--valido');
            bloqueInfo.classList.remove('valido');
        }

    });
}

//Funcion de mensaje, recibe un titulo y mensaje para mostrar
function mensajeVentanaEmergente(titulo,mensaje){
    let ventanaEmergenteTitulo = document.querySelector('.ventana-emergente__titulo');
    let ventanaEmergenteMensaje = document.querySelector('.ventana-emergente__mensaje');
    ventanaEmergenteTitulo.textContent = titulo;
    ventanaEmergenteMensaje.textContent = mensaje;
}

//crea un tipo de mensaje, según los campos del formulario
function mensajeContacto(){
    let botonEnviarMensaje = document.querySelector('#enviarMensaje');
    botonEnviarMensaje.addEventListener('click',e => {
        let bloqueInfoNombre = document.querySelector('#bloque-nombre');
        let bloqueInfoApellido = document.querySelector('#bloque-apellido');
        let bloqueInfoTelefono = document.querySelector('#bloque-telefono');
        let bloqueInfoMensaje = document.querySelector('#bloque-mensaje');
        let contenedorVentanaEmergente = document.querySelector('.contenedor--ventana-emergente');
        let botonSalir = document.querySelector('#boton-salir');


        let ventanaEmergenteTitulo = document.querySelector('.ventana-emergente__titulo');
        
        e.preventDefault();
        if(bloqueInfoNombre.classList.contains('valido') &&
        bloqueInfoApellido.classList.contains('valido') &&
        bloqueInfoTelefono.classList.contains('valido') &&
        bloqueInfoMensaje.classList.contains('valido')
        ){
            contenedorVentanaEmergente.style.display = "flex";
            ventanaEmergenteTitulo.style.color = 'green';
            
            mensajeVentanaEmergente("Exito","Tu mensaje ha sido enviado correctamente.")
            setTimeout(() => {
                location.reload();
                
            }, 3000);
            
        }else{
            
            
            mensajeVentanaEmergente("Atención","Debe rellenar todos los campos.")
            contenedorVentanaEmergente.style.display = "flex";
        }
        botonSalir.addEventListener('click', e => {
            contenedorVentanaEmergente.style.display = "none";
        });
        
    } );

}

//Crea el html necesario para mostrar una ventana de alerta
function crearContenedorVentanaEmergente(){
    let contenedorVentanaMensaje = document.createElement('DIV');
    contenedorVentanaMensaje.classList.add('contenedor--ventana-emergente');

    let html = document.querySelector('body');
    html.insertAdjacentElement('afterbegin',contenedorVentanaMensaje);

    let ventanaEmergente = document.createElement('DIV');
    ventanaEmergente.classList.add('ventana-emergente');
    contenedorVentanaMensaje.appendChild(ventanaEmergente);

    let ventanaEmergenteTitulo = document.createElement('H2');
    ventanaEmergenteTitulo.classList.add('ventana-emergente__titulo');
    //ventanaEmergenteTitulo.textContent = "Atención";
    ventanaEmergente.appendChild(ventanaEmergenteTitulo);

    let ventanaEmergenteMensaje = document.createElement('P');
    ventanaEmergenteMensaje.classList.add('ventana-emergente__mensaje');
    //ventanaEmergenteMensaje.textContent = "Debe rellenar todos los campos.";
    ventanaEmergente.appendChild(ventanaEmergenteMensaje);

    let ventanaEmergenteBoton = document.createElement('DIV');
    ventanaEmergenteBoton.classList.add('ventana-emergente__boton');
    ventanaEmergente.appendChild(ventanaEmergenteBoton);
    let botonSalir = document.createElement('BUTTON');
    botonSalir.setAttribute('id','boton-salir');
    botonSalir.textContent = 'Salir';
    ventanaEmergenteBoton.appendChild(botonSalir);
}






