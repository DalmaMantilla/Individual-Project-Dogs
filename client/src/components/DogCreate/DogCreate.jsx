import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments, getDogs} from "../../redux/actions";
import ButtonForm from "../ButtonForm/ButtonForm";
import AlertForm from "../AlertForm/AlertForm";
// import Header from "../Header/Header";
import { Link } from "react-router-dom";
import DoubleInput from "../DoubleInput/DoubleInput";
import SelectTemperamentsForm from "../SelectTemperamentsForm/SelectTemperamentsForm";
import style from "../DogCreate/DogCreate.module.css";



export default function DogCreate() {
  const dispatch = useDispatch();
  const temperament = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.dogs);
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
    if (e.target.value === "select") return;
    for (const key of tempsSelected) {
      if (key.temperament === e.target.value) return;
    }
    setTempsSelected([...tempsSelected, e.target.value]);
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
    const dataDog = {
      name,
      min_height: height.min,
      max_height: height.max,
      min_weight: weight.min,
      max_weight: weight.max,
      image,
      life_span: finalLifeSpan,
      temperament: tempsSelected,
    };
    const res = dispatch(postDog(dataDog));
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
        {/* <div className={style.header}>
          <Header/>
        </div> */}
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
                  handleAdd={handleAddTemp}
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



