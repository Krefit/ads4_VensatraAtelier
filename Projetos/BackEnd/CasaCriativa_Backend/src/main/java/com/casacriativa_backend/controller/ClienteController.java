package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Cliente;
import com.casacriativa_backend.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/cliente")
    public ResponseEntity<List<Cliente>> getAllCliente(){
        List<Cliente> clientes = new ArrayList<>();

        clienteRepository.findAll().forEach(clientes::add);

        if(clientes.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(clientes, HttpStatus.OK);
    }

    @GetMapping("/cliente/{id}")
    public ResponseEntity<Cliente> getClientePorId(@PathVariable(value = "id")int id){
        Cliente cliente = clienteRepository.findById(id).orElseThrow(RuntimeException::new);

        return new ResponseEntity<>(cliente,HttpStatus.OK);
    }

    @PutMapping("/cliente/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable("id") int id, @RequestBody Cliente clienteRequest){
        Cliente cliente = clienteRepository.findById(id).orElseThrow();

        cliente.setEmail(clienteRequest.getEmail());
        cliente.setEndereco(clienteRequest.getEndereco());
        cliente.setNome(clienteRequest.getNome());
        cliente.setTelefone(clienteRequest.getTelefone());

        return new ResponseEntity<>(clienteRepository.save(cliente), HttpStatus.OK);
    }

    @PostMapping("/cliente")
    public void createCliente(@RequestBody Cliente cliente){
        clienteRepository.save(cliente);
    }

    @DeleteMapping("/cliente/{id}")
    public ResponseEntity<HttpStatus> deleteCliente(@PathVariable("id") int id){
        clienteRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}


