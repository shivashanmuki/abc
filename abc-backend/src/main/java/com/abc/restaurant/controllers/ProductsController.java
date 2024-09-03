package com.abc.restaurant.controllers;

import com.abc.restaurant.entities.Products;
import com.abc.restaurant.services.ProductsService;
import com.abc.restaurant.utils.ResponseWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @PostMapping
    public ResponseEntity<ResponseWrapper<Products>> createProduct(@RequestBody Products product) {
        Products createdProduct = productsService.createProduct(product);
        if (createdProduct != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseWrapper<>(
                    200,
                    "Created",
                    createdProduct
            ));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    500,
                    "Something went wrong",
                    null
            ));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Products>> updateProduct(@PathVariable Long id, @RequestBody Products productDetails) {
        Products updatedProduct = productsService.updateProduct(id, productDetails);
        if (updatedProduct != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    200,
                    "Updated",
                    updatedProduct
            ));
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    500,
                    "Something went wrong",
                    null
            ));
        }
    }

    @GetMapping
    public ResponseEntity<ResponseWrapper<List<Products>>> getAllProducts() {
        List<Products> productsList = productsService.getAllProducts();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                200,
                "Fetched all products",
                productsList
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Products>> getProductById(@PathVariable Long id) {
        Products product = productsService.getProductById(id);
        if (product != null) {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    200,
                    "Fetched product by ID",
                    product
            ));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseWrapper<>(
                    404,
                    "Product not found",
                    null
            ));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseWrapper<Void>> deleteProduct(@PathVariable Long id) {
        try {
            productsService.deleteProduct(id);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseWrapper<>(
                    200,
                    "Deleted",
                    null
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseWrapper<>(
                    404,
                    "Product not found",
                    null
            ));
        }
    }
}
