import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import "../styles/pages/teams.css";
import withAuthorization from "../components/withAuthorization";

function Teams() {
  const [equipos] = useState([
    { name: 'Team1', members: ['David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando', 'Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor'] },
    { name: 'Team2', members: ['Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo', 'Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas'] },
    { name: 'Team3', members: ['Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel', 'Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David'] },
    { name: 'Team4', members: ['Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team5', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
    { name: 'Team6', members: ['Lola', 'Hector', 'Paula', 'Eduardo', 'Ivan', 'Lucas', 'Sara', 'Gonzalo', 'David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando'] },
    { name: 'Team7', members: ['Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor', 'Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo'] },
    { name: 'Team8', members: ['Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas', 'Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel'] },
    { name: 'Team9', members: ['Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David', 'Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team10', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
    { name: 'Team11', members: ['David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando', 'Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor'] },
    { name: 'Team12', members: ['Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo', 'Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas'] },
    { name: 'Team13', members: ['Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel', 'Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David'] },
    { name: 'Team14', members: ['Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team15', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
    { name: 'Team16', members: ['Lola', 'Hector', 'Paula', 'Eduardo', 'Ivan', 'Lucas', 'Sara', 'Gonzalo', 'David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando'] },
    { name: 'Team17', members: ['Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor', 'Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo'] },
    { name: 'Team18', members: ['Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas', 'Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel'] },
    { name: 'Team19', members: ['Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David', 'Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team20', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
    { name: 'Team21', members: ['David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando', 'Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor'] },
    { name: 'Team22', members: ['Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo', 'Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas'] },
    { name: 'Team23', members: ['Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel', 'Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David'] },
    { name: 'Team24', members: ['Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team25', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
    { name: 'Team26', members: ['Lola', 'Hector', 'Paula', 'Eduardo', 'Ivan', 'Lucas', 'Sara', 'Gonzalo', 'David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando'] },
    { name: 'Team27', members: ['Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor', 'Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo'] },
    { name: 'Team28', members: ['Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas', 'Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel'] },
    { name: 'Team29', members: ['Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David', 'Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team30', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
    { name: 'Team31', members: ['David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando', 'Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor'] },
    { name: 'Team32', members: ['Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo', 'Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas'] },
    { name: 'Team33', members: ['Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel', 'Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David'] },
    { name: 'Team34', members: ['Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team35', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
    { name: 'Team36', members: ['Lola', 'Hector', 'Paula', 'Eduardo', 'Ivan', 'Lucas', 'Sara', 'Gonzalo', 'David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando'] },
    { name: 'Team37', members: ['Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor', 'Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo'] },
    { name: 'Team38', members: ['Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas', 'Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel'] },
    { name: 'Team39', members: ['Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David', 'Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team40', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
    { name: 'Team41', members: ['David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando', 'Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor'] },
    { name: 'Team42', members: ['Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo', 'Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas'] },
    { name: 'Team43', members: ['Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel', 'Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David'] },
    { name: 'Team44', members: ['Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team45', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] },
    { name: 'Team46', members: ['Lola', 'Hector', 'Paula', 'Eduardo', 'Ivan', 'Lucas', 'Sara', 'Gonzalo', 'David', 'Belen P', 'Sofia', 'Joaco', 'Baltasar', 'Valentin', 'Belen F', 'Agus', 'Ana', 'Carlos', 'Laura', 'Miguel', 'Jose', 'Luis', 'Lucia', 'Andres', 'Elena', 'Ramon', 'Paula', 'Pedro', 'Marcos', 'Fernando'] },
    { name: 'Team47', members: ['Natalia', 'Sergio', 'Gema', 'Hugo', 'Cristina', 'Antonio', 'Ricardo', 'Victor', 'Patricia', 'Ivan', 'Nerea', 'Emilio', 'Oscar', 'Samuel', 'Carmen', 'Raul', 'Isabel', 'Pablo', 'Sara', 'Jaime', 'Javier', 'Diego', 'Clara', 'Miquel', 'Silvia', 'Adrian', 'Teresa', 'Alberto', 'Elias', 'Rodrigo'] },
    { name: 'Team48', members: ['Eva', 'Joaquin', 'Jorge', 'Miriam', 'Andrea', 'Gabriel', 'Borja', 'Tomas', 'Irene', 'Hector', 'Yolanda', 'Luis', 'Blanca', 'Carlos', 'Julio', 'Mateo', 'Ana', 'Manuel', 'Angela', 'Ruben', 'Gloria', 'Lucas', 'Dario', 'Raul', 'Sonia', 'Federico', 'Sandra', 'Alvaro', 'Eva', 'Miguel'] },
    { name: 'Team49', members: ['Cesar', 'Mariano', 'Rocio', 'Ignacio', 'Veronica', 'Sergio', 'Nuria', 'David', 'Paco', 'Cristobal', 'Maria', 'Eugenio', 'Ines', 'Marcos', 'Claudia', 'Jesus', 'Marcel', 'Julian', 'Luz', 'Esteban', 'Olga', 'Oscar', 'Diana', 'Victor', 'Ruben', 'Francisco', 'Elisa', 'Jordi', 'Marina', 'Eduardo', 'Jimena', 'Alex', 'Felipe', 'Guillermo', 'Rebeca', 'Santiago', 'Lara', 'Juan'] },
    { name: 'Team50', members: ['Lidia', 'Adrian', 'Emilio', 'Andres', 'Marta', 'Pedro', 'Esther', 'Carlos', 'Raquel', 'Daniel', 'Pablo', 'Jorge', 'Teresa', 'Alfonso', 'Alicia', 'Victor', 'Elena', 'Gabriel', 'Ignacio', 'Roberto', 'Rosa', 'Miguel', 'Nuria', 'Alvaro', 'Beatriz', 'Felix', 'Javier', 'Tomas', 'Ana', 'Fernando'] }
  ]);
  const equiposPorPagina = 8;
  const [paginaActual, setPaginaActual] = useState(1);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [equiposFiltrados, setEquiposFiltrados] = useState([]);

  useEffect(() => {
    const filteredEquipos = equipos.filter(equipo => {
      return equipo.members.some(jugador => jugador.toLowerCase().includes(searchTerm.toLowerCase()));
    });
    setEquiposFiltrados(filteredEquipos);
    setPaginaActual(1); // Reiniciar a la primera página cuando cambia el término de búsqueda
  }, [equipos, searchTerm]);

  const totalPaginas = Math.ceil(equiposFiltrados.length / equiposPorPagina);

  const handleEquipoClick = (equipo) => {
    if (equipo === equipoSeleccionado) {
      setEquipoSeleccionado(null);
    } else {
      setEquipoSeleccionado(equipo);
    }
  };

  const handlePaginaAnterior = () => {
    if (paginaActual > 1) {
      setPaginaActual(paginaActual - 1);
    }
  };

  const handlePaginaSiguiente = () => {
    if (paginaActual < totalPaginas) {
      setPaginaActual(paginaActual + 1);
    }
  };

  const indexOfLastEquipo = paginaActual * equiposPorPagina;
  const indexOfFirstEquipo = indexOfLastEquipo - equiposPorPagina;

  const equiposPaginaActual = equiposFiltrados.slice(indexOfFirstEquipo, indexOfLastEquipo);

  return (
  
    <div className="equipos-container">
      <h2>Equipos</h2>
      <input
        type="text"
        placeholder="Buscar jugadores..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="equipos-lista">
        {equiposPaginaActual.map((equipo, index) => {
          const isSelected = equipo === equipoSeleccionado;
          return (
            <div
              key={index}
              className={`equipo-item ${isSelected ? 'selected' : ''}`}
              onClick={() => handleEquipoClick(equipo)}
            >
              <div className="equipo-header">
                <span className="equipo-title">{equipo.name}</span>
                {isSelected ? <FaMinus /> : <FaPlus />}
              </div>
              {isSelected && (
                <ul className="jugadores-list">
                  {equipo.members.map((jugador, index) => (
                    <li key={index} className="jugador-item">{jugador}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
      <div className="paginacion">
        <button onClick={handlePaginaAnterior} disabled={paginaActual === 1}>Anterior</button>
        <span>Página {paginaActual} de {totalPaginas}</span>
        <button onClick={handlePaginaSiguiente} disabled={paginaActual === totalPaginas}>Siguiente</button>
      </div>
    </div>
  );
};

export default withAuthorization(Teams);