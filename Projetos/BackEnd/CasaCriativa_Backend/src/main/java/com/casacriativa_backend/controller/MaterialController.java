package com.casacriativa_backend.controller;

import com.casacriativa_backend.model.Material;
import com.casacriativa_backend.model.Produto;
import com.casacriativa_backend.repository.MaterialRepository;
import com.casacriativa_backend.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MaterialController {

    @Autowired
    private MaterialRepository materialRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/material")
    public ResponseEntity<List<Material>> getAllMaterial(){
        List<Material> material = new ArrayList<Material>();

        materialRepository.findAll().forEach(material::add);

        if(material.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(material, HttpStatus.OK);
    }

    @GetMapping("/produto/{produtoId}/material")
    public ResponseEntity<List<Material>> getAllMaterialPorProdutoId(@PathVariable(value = "produtoId") int produtoId){
        if(!produtoRepository.existsById(produtoId)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Material> materialLista = materialRepository.findByMateriaisProdutos_Produto_Id(produtoId);
        return new ResponseEntity<>(materialLista, HttpStatus.OK);
    }

    @GetMapping("/material/{id}")
    public ResponseEntity<Material> getMaterialPorId(@PathVariable(value = "id") int id){
        Material material = materialRepository.findById(id).orElseThrow(RuntimeException::new);

        return new ResponseEntity<>(material, HttpStatus.OK);
    }

    @GetMapping("/material/{materialId}/produto")
    public ResponseEntity<List<Produto>> getAllProdutoporMaterialId(@PathVariable(value = "materialId") int materialId){

        if(!materialRepository.existsById(materialId)){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Produto> produtos = produtoRepository.findByProdutosMateriais_Material_Id(materialId);
        return new ResponseEntity<>(produtos, HttpStatus.OK);
    }

    @PutMapping("/material/{id}")
    public ResponseEntity<Material> updateMaterial(@PathVariable("id") int id, @RequestBody Material materialRequest){
        Material material = materialRepository.findById(id).orElseThrow();

        material.setDescricao(materialRequest.getDescricao());
        material.setPreco(materialRequest.getPreco());
        material.setQuantidade(materialRequest.getQuantidade());

        return new ResponseEntity<>(materialRepository.save(material), HttpStatus.OK);
    }

    @DeleteMapping("/produto/{produtoId}/material/{materialId}")
    public ResponseEntity<HttpStatus> deleteMaterialDeProduto(@PathVariable(value = "produtoId") int produtoId, @PathVariable(value = "materialId") int materialId) {
        if (!produtoRepository.existsById(produtoId)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Produto produto = produtoRepository.findById(produtoId).orElseThrow();

        // Assuming the Produto class has a method to remove materials
        produto.removeMaterial(materialId);

        produtoRepository.save(produto);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/material/{id}")
    public ResponseEntity<HttpStatus> deleteMaterial(@PathVariable("id") int id){
        materialRepository.deleteById(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/material")
    public void createMaterial(@RequestBody Material material) {
        materialRepository.save(material);
    }


}
