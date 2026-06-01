CREATE DATABASE abyss;
USE abyss;

CREATE TABLE usuarioabyss (
  idUsuario int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  usuario varchar(45),
  email varchar(45),
  senha varchar(45),
  sexo varchar(45),
  tempo datetime 
  );
  CREATE TABLE quiz (
  idQuiz int PRIMARY KEY NOT NULL AUTO_INCREMENT,
  pontuacao int ,
  acertos int ,
  erros int ,
  fkUsuarioAbyss int ,
  CONSTRAINT fkUsuario FOREIGN KEY (fkUsuarioAbyss) REFERENCES usuarioabyss (idUsuario)
);
