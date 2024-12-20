package me.send.controller;

import me.send.model.User;
import me.send.model.response.UserResponse;
import me.send.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();

        UserResponse userMeResponse = userService.genereUserResponse(currentUser);

        return ResponseEntity.ok(userMeResponse);
    }

    @GetMapping("/")
    public ResponseEntity<List<UserResponse>> allUsers() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        User currentUser = (User) authentication.getPrincipal();
        if (currentUser.getAuthorities().stream().noneMatch(role -> role.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        List<UserResponse> users = userService.allUsers();

        return ResponseEntity.ok(users);
    }
}