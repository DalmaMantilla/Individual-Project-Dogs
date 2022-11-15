import { useState, useEffect, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments, getDogs} from "../../redux/actions";
import ButtonForm from "../ButtonForm/ButtonForm";
import AlertForm from "../AlertForm/AlertForm";
import { Link } from "react-router-dom";
import DoubleInput from "../DoubleInput/DoubleInput";
import SelectTemperamentsForm from "../SelectTemperamentsForm/SelectTemperamentsForm";
import style from "../DogCreate/DogCreate.module.css";



export default function DogCreate() {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperament = useSelector((state) => state.temperaments);
  const dogsName = dogs.map((d) => d.name);


  //----------cuando se monta el componente lanza los perros y temp----------
  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
  }, [dispatch]);


  //----------Creo estados locales para el llenado de cada campo----------
  const [name, setName] = useState("");
  const [height, setHeight] = useState({
    min: "",
    max: "",
  });
  const [weight, setWeight] = useState({
    min: "",
    max: "",
  });
  const [life_span, setLifeSpan] = useState({
    min: "",
    max: "",
  });
  const [image, setImage] = useState("");
  const [tempsSelected, setTempsSelected] = useState([]);
  const [input, setInput] = useState({
    text: "",
    error: false,
    success: false,
    temperament: []
  }); 


  //----------Valido los datos ingresados en cada campo----------
  const validate = () => {
    //Si el campo nombre esta vacio
    if (!name) {
      setInput({
        text: "Name is required",
        error: true,
        success: false,
      });
      return true;
    }
    //Si el campo nombre no son letras
    if (!name.match(/^[A-Za-z]+$/)) {
      setInput({
        text: "Name must contain only letters",
        error: true,
        success: false,
      });
      return true;
    }
    //Si el campo nombre no comienza con mayuscula
    if (!name.match(/^[A-Z][a-z]+$/)) {
      setInput({
        text: "Name must start with a capital letter",
        error: true,
        success: false,
      });
      return true;
    }
    //Si el nombre del perro ya existe
    if (dogsName.includes(name)) {
      setInput({
        text: `The name ${name} already exists`,
        error: true,
        success: false,
      });
      return true;
    }
    //Si la altura es cero
    if (parseFloat(height.min) === 0 || parseFloat(height.max) === 0) {
      setInput({
        text: "The height can't be 0",
        error: true,
        success: false,
      });
      return true;
    }
    //Si la altura minima es mayor que la altura maxima
    if (parseFloat(height.min) > parseFloat(height.max)) {
      setInput({
        text: "The min height can't be greater than the max height",
        error: true,
        success: false,
      });
      return true;
    }
    //Si el peso es cero
    if (parseFloat(weight.min) === 0 || parseFloat(weight.max) === 0) {
      setInput({
        text: "The weight can't be 0",
        error: true,
        success: false,
      });
      return true;
    }
    //Si la peso minima es mayor que el peso maximo
    if (parseFloat(weight.min) > parseFloat(weight.max)) {
      setInput({
        text: "The min weight can't be greater than the max weight",
        error: true,
        success: false,
      });
      return true;
    }
    //Si el tiempo de vida es cero
    if (parseFloat(life_span.min) === 0 || parseFloat(life_span.max) === 0) {
      setInput({
        text: "The life span can't be 0",
        error: true,
        success: false,
      });
      return true;
    }
    //Si el tiempo de vida minima es mayor que el tiempo de vida maxima
    if (parseFloat(life_span.min) > parseFloat(life_span.max)) {
      setInput({
        text: "The min life span can't be greater than the max life span",
        error: true,
        success: false,
      });
      return true;
    }

    
    //Si no ingreso temperamentos
    if (tempsSelected.length === 0) {
      setInput({
        text: "You must select at least one temperament",
        error: true,
        success: false,
      });
      return true;
    }
    return false;
  };


//----------Agrega temp limitando su cantidad----------
  const handleAddTemp = (e) => {
    if (tempsSelected.length > 5) {
      return setInput({
        text: "You can't select more than 6 temperaments",
        error: true,
        success: false,
      });
    } 

    if (e.target.value === 'all') return;
    for (const key of tempsSelected) {
      if (key.temperament === e.target.value) return;
    }
    setTempsSelected([...tempsSelected, e.target.value]);
    console.log('Temperamentos seleccionados',setTempsSelected)    
  };
 

  //---------Elimino temperamentos----------
  const handleRemove = (e) => {
    setTempsSelected(tempsSelected.filter((t) => t !== e.target.id));
  };


  //---------Cierra la ventana de alerta----------
  const onClose = () => {
    setInput({
      text: "",
      error: false,
      success: false,
    });
  };

  
  //Si la validacion de los datos q envio el form esta bien, crea el perro
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) return;
    
    const finalLifeSpan = `${life_span.min} - ${life_span.max} years`;
    
    const newDog = {
      name,
      min_height: height.min,
      max_height: height.max,
      min_weight: weight.min,
      max_weight: weight.max,
      image,
      life_span: finalLifeSpan,
      temperament: tempsSelected,
    }; 
    const res = dispatch(postDog(newDog));

    if (res.error) {
      return setInput({
        text: res.error,
        error: true,
        success: false,
      });
    } else {
      return (
        setInput({
          text: "Dog successfully created!",
          error: false,
          success: true,
        }),
        setName(""),
        setHeight({ min: "", max: "" }),
        setWeight({ min: "", max: "" }),
        setLifeSpan({ min: "", max: "" }),
        setImage(""),
        setTempsSelected([])
      );
    }
  };


  return (
    <>
      <div className={style.container}>
        {(input.error || input.success) && (
          <AlertForm input={input} onClose={onClose} />
        )}
      
        <Link to="/home">
          <button className={style.btn_home}>Back to Home</button>
        </Link>
        <div className={style.main}>
          <section className={style.section_form}>
            <h1 className={style.title}>CREATE YOUR DOG</h1>
            <form onSubmit={handleSubmit} className={style.form_input}>
              <div className={style.campo}>
                <label>Name: </label>
                <input
                  className={style.input}
                  type="text"
                  name="name"
                  placeholder="Name..."
                  value={name}
                  autoComplete={"off"}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={style.campo}>
                <DoubleInput
                  label="Height"
                  value={height}
                  setState={setHeight}
                />
              </div>
              <div className={style.campo}>
                <DoubleInput
                  label="Weight"
                  value={weight}
                  setState={setWeight}
                />
              </div>
              <div className={style.campo}>
                <DoubleInput
                  label="Life span"
                  value={life_span}
                  setState={setLifeSpan}
                />
              </div>
              <div className={style.campo}>
                <label>Image: </label>
                <input
                  className={style.input}
                  type="text"
                  name="image"
                  placeholder="Url..."
                  value={image}
                  autoComplete={"off"}
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className={style.campo}>
                <SelectTemperamentsForm
                  temperament={temperament}
                  tempsSelected={tempsSelected}
                  handleAddTemp={handleAddTemp}
                  handleRemove={handleRemove}
                />
               </div>
              <div className={style.button_create}>
                <ButtonForm type={"submit"} text={"CREATE"} />
              </div>
            </form>
          </section>
        </div>
      </div>
    </>
  );
};










// import { useState, useEffect, React } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { postDog, getTemperaments, getDogs} from "../../redux/actions";
// import ButtonForm from "../ButtonForm/ButtonForm";
// import AlertForm from "../AlertForm/AlertForm";
// import { Link } from "react-router-dom";
// import DoubleInput from "../DoubleInput/DoubleInput";
// import SelectTemperamentsForm from "../SelectTemperamentsForm/SelectTemperamentsForm";
// import style from "../DogCreate/DogCreate.module.css";


// // Validador errores de los inputs
// const validateText = (input) => {
//   const err = {};

//   if (! input.nombre) err.nombre = "Name is a required field!";
//   else if (input.nombre.length > 40) err.nombre = "Name must be under 40 characters.";

//   if (! input.min_height) err.min_height = 'You must provide a minimum height!'
//   else if (input.min_height < 5) err.min_height = "Come on, no dog is less than 5cm...";
//   else if (isNaN(input.min_height)) err.min_height = "Minimum height must be a number.";

//   if (! input.max_height) err.max_height = 'You must provide a maximum height!'
//   else if (input.max_height > 70) err.max_height = "Your dog cannot be THAT huge";
//   else if (isNaN(input.max_height)) err.max_height = "Maximum height must be a number.";

//   if (input.min_height && input.max_height && parseInt(input.min_height) >= parseInt(input.max_height)) err.max_height = 'Maximum height must be bigger than minimum.'

//   if (! input.min_weight) err.min_weight = "You must provide a minimum weight!";
//   else if (input.min_weight < 1) err.min_weight = "The breed must weigh more than 1kg.";
//   else if (isNaN(input.min_weight)) err.min_weight = "Minimum weight must be a number.";
  
//   if (! input.max_weight) err.max_weight = "You must provide a maximum weight!";
//   else if (input.max_weight > 120) err.max_weight = "The breed must be lighter than 120kg.";
//   else if (isNaN(input.max_weight)) err.max_weight = "Maximum weight must be a number.";
  
//   if (input.min_weight && input.max_weight && parseInt(input.min_weight) >= parseInt(input.max_weight)) err.max_weight = 'Maximum weight must be bigger than minimum.'

//   if (input.life_time_min && input.life_time_min < 3) err.life_time_min = "Minimum life span must be bigger than 3 years.";
//   else if (input.life_time_min && isNaN(input.life_time_min)) err.life_time_min = "Minimum life span must be a number.";

//   if (input.life_time_max && input.life_time_max > 30) err.life_time_max = "Maximum life span must be smaller than 30 years.";
//   else if (input.life_time_max && isNaN(input.life_time_max)) err.life_time_max = "Maximum life span must be a number.";

//   if (input.life_time_min && ! input.life_time_max) err.life_time_min = 'Both life spans must be provided!';
//   if (! input.life_time_min && input.life_time_max) err.life_time_max = 'Both life spans must be provided!';
  
//   if (input.life_time_min && input.life_time_max && parseInt(input.life_time_min) >= parseInt(input.life_time_max)) err.life_time_max = 'Maximum life span must be bigger than minimum.'

//   return err;
// };



// export default function DogCreate() {
//   // dispatch importado
//   const dispatch = useDispatch();

//   // obtengo el array de temperamentos y el de perros desde redux
//   const temperamentsState = useSelector((state) => state.temperaments);
//   const dogs = useSelector((state) => state.dogs);

//   // tracker de temperamentos de la DB, errores y el estado de los inputs
//   const [temperamentsDB, setTempDB] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [iniciado, setIniciado] = useState(true);
//   const [input, setInput] = useState({
//     text: "",
//     error: false,
//     success: false,
//     name:'' ,
//     min_height:'',
//     max_height:'',
//     min_weight:'', 
//     max_weight:'',
//     life_time_min:'',
//     life_time_max:'',
//     temperament:[], 
//   });


//   //----------cuando se monta el componente lanza los perros y temp----------
//   useEffect(() => {
//     dispatch(getDogs());
//     dispatch(getTemperaments());
//   }, [dispatch]);


//   // handler del submit
//   // si no hay errores en los campos obligatorios, reinicia el estado de
//   // los inputs, crea una variable para la nueva raza, y la manda por dispatch.
//   const handleSubmit = e => {
//     e.preventDefault();
//     if (! errors.nombre && ! errors.min_weight && ! errors.max_weight && ! errors.min_height 
//         && ! errors.max_weight && ! errors.lifetimeMin && ! errors.lifetimeMax) {

//         const newDog = {
//           ...input,
//           name: input.name.trim(),
//           image: input.image.length ? input.image.trim() : 'https://lacrafta.com/wp-content/uploads/2020/07/Papercraft-Dog-4.jpg',
//           temperament: temperamentsDB,
//           life_time_min: input.life_time_min,
//           life_time_max: input.life_time_max,
//         };

//         dispatch(postDog(newDog))
//         .then(res => setInput({
//           text: "Dog successfully created!",
//           error: false,
//           success: true,
//         }),)
  
//         setTempDB([]);
//         setInput({
//           name:'' ,
//           min_height:'',
//           max_height:'',
//           min_weight:'', 
//           max_weight:'',
//           life_time_min:'',
//           life_time_max:'',
//           temperament:[], 
//         });
//       } 
//   }


// // grupo de handlers varios (cambios, selección y remoción de temperamentos en db)
// const handleChange = (e) => {
//   setIniciado(false);
//   setInput({...input, [e.target.name]: e.target.value});
//   setErrors(validateText({...input, [e.target.name]: e.target.value}));
// }

// //----------Agrega temperamentos limitando su cantidad----------
// const handleAddTemp = (e) => {
//   (! temperamentsDB.includes(e.target.value) && temperamentsDB.length < 6) && setTempDB([...temperamentsDB, e.target.value]);
//   if (temperamentsDB.length === 6) 
//     return setInput({
//       text: "You can't select more than 6 temperaments",
//       error: true,
//       success: false,
//     });
// }

// //---------Elimino temperamentos----------
// const handleDelete = (e) => {
//   e.preventDefault();
//   setTempDB(temperamentsDB.filter(t => t !== e.target.value));
// }


//   //---------Cierra la ventana de alerta----------
//   const onClose = () => {
//     setInput({
//       text: "",
//       error: false,
//       success: false,
//     });
//   };


//   return (
//     <>
//       <div className={style.container}>
//         {(input.error || input.success) && (
//           <AlertForm input={input} onClose={onClose} />
//         )}
      
//         <Link to="/home">
//           <button className={style.btn_home}>Back to Home</button>
//         </Link>
//         <div className={style.main}>
//           <section className={style.section_form}>
//             <h1 className={style.title}>CREATE YOUR DOG</h1>
//             <form onSubmit={handleSubmit} className={style.form_input}>

//               <div className={style.campo}>
//                 <label>Name: </label>
//                   <input
//                     className={style.input}
//                     type="text"
//                     name="name"
//                     placeholder="Name..."
//                     value={input.name}
//                     autoComplete={"off"}
//                     required
//                     onChange={handleChange}
//                   />
//               </div>

//               <div className={style.campo}>
//                 <label>Min height: </label>
//                   <input
//                     className={style.input}
//                     type="number"
//                     name="min"
//                     placeholder="Min"
//                     min={1}
//                     value={input.min_height}
//                     autoComplete={"off"}
//                     required
//                     onChange={handleChange}
//                   />{" "}
//                     -{" "}
//                 <label>Max height: </label>
//                   <input
//                     className={style.input}
//                     type="number"
//                     name="max"
//                     placeholder="Max"
//                     min={1}
//                     value={input.max_height}
//                     autoComplete={"off"}
//                     required
//                     onChange={handleChange}
//                   />
//               </div>
                
//               <div className={style.campo}>
//                 <label>Min weight: </label>
//                   <input
//                     className={style.input}
//                     type="number"
//                     name="min"
//                     placeholder="Min"
//                     min={1}
//                     value={input.min_weight}
//                     autoComplete={"off"}
//                     required
//                     onChange={handleChange}
//                   />{" "}
//                   -{" "}
//                 <label>Max height: </label>
//                   <input
//                     className={style.input}
//                     type="number"
//                     name="max"
//                     placeholder="Max"
//                     min={1}
//                     value={input.max_weight}
//                     autoComplete={"off"}
//                     required
//                     onChange={handleChange}
//                   />
//               </div>

//               <div className={style.campo}>
//                 <label>Min life: </label>
//                   <input
//                     className={style.input}
//                     type="number"
//                     name="min"
//                     placeholder="Min"
//                     min={1}
//                     value={input.life_time_min}
//                     autoComplete={"off"}
//                     required
//                     onChange={handleChange}
//                   />{" "}
//                     -{" "}
//                 <label>Max life: </label>
//                   <input
//                     className={style.input}
//                     type="number"
//                     name="max"
//                     placeholder="Max"
//                     min={1}
//                     value={input.life_time_max}
//                     autoComplete={"off"}
//                     required
//                     onChange={handleChange}
//                   />
//               </div>

//               <div className={style.campo}>
//                 <label>Image: </label>
//                   <input
//                     className={style.input}
//                     type="text"
//                     name="image"
//                     placeholder="Insert URL..."
//                     value={input.image}
//                     autoComplete={"off"}
//                     onChange={handleChange}
//                   />
//               </div>

//               <div className={style.campo}>
//                 <div>
//                   <select className="createBox" defaultValue='default' onChange={handleAddTemp}>
//                     <option value="default" disabled>Temperament:</option>
//                       { temperamentsState.length ? temperamentsState.map(t => (
//                         <option key={t.id} value={t.nombre}>
//                           {t.nombre}
//                         </option>
//                       )) : null }
//                   </select>
//                   <ul >
//                     {temperamentsDB.map((temp, id)=> (
//                       <li className="selTempItem" key={id}>
//                         <button className="style.x" value={temp} onClick={e => handleDelete(e)}>x</button>
//                           {temp}       
//                        </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//               <div className={style.button_create}>
//                 <ButtonForm type={"submit"} text={"CREATE"} />
//               </div>
//             </form>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// };

