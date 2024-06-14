import { getAll, remove, save, selectOne, update } from "./firestore.js"
let id = ''
//addEventListener permite invocar eventos(click,change,blur)
document.getElementById('btnSave').addEventListener('click', () => {
    //sirve para validar los campos 
    document.querySelectorAll('.form-control, .form-select').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        const persona = {
            run: document.getElementById('run').value,
            nom: document.getElementById('nombre').value,
            ape: document.getElementById('apellido').value,
            escuderia: document.getElementById('escuderia').value,
            fecha: document.getElementById('fecha').value,
            fecha2: document.getElementById('fecha2').value,
            email: document.getElementById('email').value,
            fono: document.getElementById('fono').value
        }
        //si el id es vacio se guarda
        if(id == ''){
            save(persona) 
            Swal.fire({
                title: "Registro Guardado!",
                text: "Has guardado el formulario exitosamente!",
                icon: "success"
              });
        }
        else{
            update(id,persona) //si el id no es vacio se edita
            Swal.fire({
                title: "Registro Editado!",
                text: "Has editado el formulario exitosamente!",
                icon: "success"
              });
        }
        limpiar()
        id = ''        
    }
})


//DOMContentLoaded es un vento que se activa al recargar la página web
window.addEventListener('DOMContentLoaded', () => {
    //getAll es la función que recibe la colección de datos
    getAll(datos => {
        let tabla = ''
        //recorriendo la colección, para mostrar uno a uno los documentos en la tabla
        datos.forEach(doc => {
            //asigna el documento a la variable item(los valores están en data())
            const item = doc.data()
            tabla += `<tr>
                <td>${item.run}</td>
                <td>${item.nom}</td>
                <td>${item.ape}</td>
                <td>${item.escuderia}</td>
                <td>${item.fecha}</td>
                <td>${item.fecha2}</td>
                <td>${item.email}</td>
                <td>${item.fono}</td>
                <td nowrap>
                    <input type="button" class="btn btn-danger" value="Eliminar" 
                    id="${doc.id}">
                    <input type="button" class="btn btn-warning" value="Editar"
                        id="${doc.id}">
                </td>
            </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        //recorrer todos los botones eliminar
        document.querySelectorAll('.btn-danger').forEach(btn => {
            //indentificar a que botón se le hizo click
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Está seguro de eliminar el registro?",
                    text: "No podrá revertir los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        //invocar a la función que permite eliminar un documento según su id
                        remove(btn.id)
                        Swal.fire({
                            title: "Eliminado!",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })
        //recorrer todos los botones editar 
        document.querySelectorAll('.btn-warning').forEach(btn => {
            //indentificmos a que botón se le hizo click 
            //asyn y await permite que la función espera en segundo plano la respuesta
            btn.addEventListener('click',async()=>{
                //invocamos a la función que retornar el documento seleccionado
                const emp= await selectOne(btn.id)
                //accedemos a los datos del documento
                const e = emp.data()
                //asignar los datos del documento a los input
                document.getElementById('run').value = e.run
                document.getElementById('nombre').value = e.nom
                document.getElementById('apellido').value = e.ape
                document.getElementById('escuderia').value = e.escuderia
                document.getElementById('fecha').value = e.fecha
                document.getElementById('fecha2').value = e.fecha2
                document.getElementById('email').value = e.email
                document.getElementById('fono').value = e.fono
                
                //dejar el run de solo lectura
                document.getElementById('run').readOnly = true
                //guardar por editar
                document.getElementById('btnSave').value = 'Editar'
                //se asigna el id del documento seleccionado a la variable
                id = emp.id
            })
        })
    })
})
