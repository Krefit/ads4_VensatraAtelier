package com.casacriativa_backend;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/usuario")
public class UsuarioRest {

    @Autowired
    private UsuarioDao usuarioDao;

    @GetMapping
    public List<Usuario> get(){
        return usuarioDao.findAll();
    }

    @PostMapping
    public void post(@RequestBody Usuario usuario){
        usuarioDao.save(usuario);
    }

}
