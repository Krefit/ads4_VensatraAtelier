package com.casacriativa_backend;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDao extends JpaRepository<EmployeeClass,Integer>{
}
