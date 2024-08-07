import { useForm } from "react-hook-form";
import "./estilos/detalle.css"
import GetUserId from "./token"

const Actualizar = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit =   async (data) => {
        const userId = GetUserId();
        console.log(userId);
    
        try {
            const response = await fetch(`http://localhost:8000/users/${userId}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        {console.log(userId)}
            const respuesta = await response.json();
            alert(respuesta.message);
    
    
        } catch (error) {
            alert("Error registrando usuario: " + error.message);
        }
    }

    return (
        <form className="Actualizar-form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="tituloPartidos"> <strong>Editar informacion de usuario</strong></h2><br />
            <h4 className="tituloPartidos">Aca podras editar todo tu informacion desde el nombre de ususario hasta la contraseña</h4>
            <div className="div_actualizar">
                <label htmlFor=""> <strong>Email</strong> </label><br />
                <input
                    className="actualizarInput"
                    placeholder="Email"
                    {...register("gmail", {
                        required: true,
                        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                    })}
                />
                {errors.gmail?.type === "required" && <p>El campo es requerido</p>}
                {errors.gmail?.type === "pattern" && (
                    <p>El formato de email no es correcto</p>
                )}</div>


            <div className="div_actualizar">
                <label htmlFor=""> <strong>Nombre de Usuario</strong> </label><br />
                <input
                    className="actualizarInput"
                    type="text"
                    placeholder="Nombre De usuario"
                    {...register("nombreUsuario", {
                        required: true,
                    })}
                />
                {errors.nombreUsuario?.type === "required" && (
                    <p>El campo es requerido</p>
                )}</div>



            <div className="div_actualizar">
                <label htmlFor=""> <strong>Contraseña</strong></label><br />
                <input
                    className="actualizarInput"
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", {
                        required: true,
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    })}
                />
                {errors.password?.type === "pattern" && (
                    <p>La Contrasña debe tener 1 Mayusculo, 1 minusdcula y mas de 8 caracteres</p>
                )}
                {errors.password?.type === "required" && <p>El campo es requerido</p>}
            </div>


            <button type="submit" className="button">Registrar</button>

        </form>
    )
}

export default Actualizar