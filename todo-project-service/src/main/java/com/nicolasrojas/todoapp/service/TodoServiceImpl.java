package com.nicolasrojas.todoapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nicolasrojas.todoapp.model.entity.Todo;
import com.nicolasrojas.todoapp.repository.TodoRepository;

@Service
public class TodoServiceImpl implements TodoService {

	@Autowired
	private TodoRepository todoRepository;

	@Override
	@Transactional(readOnly = true)
	public List<Todo> findAll() {
		return (List<Todo>) todoRepository.findAll();
	}

	@Override
	public Optional<Todo> findById(Long idTodo) {
		return todoRepository.findById(idTodo);
	}

	@Override
	public Todo create(String title) {
		Todo newTodo = Todo.builder().complete(false).title(title).build();
		return todoRepository.save(newTodo);
	}

	@Override
	public boolean deleteTodo(Long idTodo) {
		todoRepository.deleteById(idTodo);
		Optional<Todo> todo = todoRepository.findById(idTodo);
		return !todo.isPresent();
	}

	@Override
	public Optional<Todo> updateComplete(Long idTodo, Boolean complete) {
		Optional<Todo> todo = todoRepository.findById(idTodo);
		if (todo.isPresent()) {
			todo.get().setComplete(complete);
			Optional.of(todoRepository.save(todo.get()));
			return Optional.of(todo.get());
		} else {
			return Optional.empty();
		}
	}
}
