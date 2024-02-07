package com.nicolasrojas.todoapp.service;

import java.util.List;
import java.util.Optional;

import com.nicolasrojas.todoapp.model.entity.Todo;

public interface TodoService {
	List<Todo> findAll();

	Optional<Todo> findById(Long idTodo);

	Todo create(String title);

	boolean deleteTodo(Long idTodo);

	Optional<Todo> updateComplete(Long idTodo, Boolean complete);
}
