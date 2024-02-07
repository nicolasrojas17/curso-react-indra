package com.nicolasrojas.todoapp.repository;

import org.springframework.data.repository.CrudRepository;

import com.nicolasrojas.todoapp.model.entity.Todo;

public interface TodoRepository extends CrudRepository<Todo, Long> {
	

}
