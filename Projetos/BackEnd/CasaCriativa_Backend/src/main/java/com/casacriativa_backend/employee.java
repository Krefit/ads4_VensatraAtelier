package com.casacriativa_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
        ("/employees")
public class employee {

    @Autowired
    private EmployeeDao employeeDao;

    @GetMapping
    public List<EmployeeClass> get() {
        return employeeDao.findAll();
    }

    @PostMapping
    public void post(@RequestBody EmployeeClass employee) {
        employeeDao.save(employee);
    }
}