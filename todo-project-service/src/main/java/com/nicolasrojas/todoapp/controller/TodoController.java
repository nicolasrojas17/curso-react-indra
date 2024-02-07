package com.nicolasrojas.todoapp.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nicolasrojas.todoapp.controller.dto.TodoDTO;
import com.nicolasrojas.todoapp.model.entity.Todo;
import com.nicolasrojas.todoapp.service.TodoService;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TodoController {

	@Autowired
	private TodoService todoService;

	@GetMapping("")
	public List<Todo> findAllProducts() {
		return todoService.findAll();
	}

	@GetMapping("/findById/{idTodo}")
	public ResponseEntity<Object> findById(@PathVariable String idTodo) {
		try {
			Long id = Long.parseLong(idTodo);
			Optional<Todo> todo = todoService.findById(id);
			return new ResponseEntity<>(
					todo.isPresent() ? todo.get() : "No se ha encontrado el todo con el id: " + idTodo, HttpStatus.OK);
		} catch (NumberFormatException e) {
			return new ResponseEntity<>("ID no valido: " + idTodo, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/create")
	public ResponseEntity<Todo> createTodo(@RequestBody TodoDTO todoDTO) {
		return new ResponseEntity<>(todoService.create(todoDTO.getTitle()), HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{idTodo}")
	public ResponseEntity<String> delete(@PathVariable String idTodo) {
		try {
			Long id = Long.parseLong(idTodo);
			boolean isDeleted = todoService.deleteTodo(id);
			return new ResponseEntity<>(isDeleted ? "Se ha eliminado el todo correctamente"
					: "No se ha podido eliminar el todo con el id: " + idTodo, HttpStatus.OK);
		} catch (NumberFormatException e) {
			return new ResponseEntity<>("ID no valido: " + idTodo, HttpStatus.BAD_REQUEST);
		}
	}

	@PutMapping("/update/{idTodo}")
    public ResponseEntity<Object> updateUser(@PathVariable String idTodo, @RequestBody TodoDTO todoDTO) {
		try {
			Long id = Long.parseLong(idTodo);
			Optional<Todo> todo = todoService.updateComplete(id, todoDTO.getComplete());
			return new ResponseEntity<>(
					todo.isPresent() ? todo.get() : "No se ha encontrado el todo con el id: " + idTodo, HttpStatus.OK);	
		} catch (NumberFormatException e) {
			return new ResponseEntity<>( "ID no valido: " + idTodo, HttpStatus.BAD_REQUEST);
		}
    }
}
