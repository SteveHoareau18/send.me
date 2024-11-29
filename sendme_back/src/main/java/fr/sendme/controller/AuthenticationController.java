package fr.sendme.controller;

import fr.sendme.model.User;
import fr.sendme.model.dto.LoginUserDto;
import fr.sendme.model.dto.RegisterUserDto;
import fr.sendme.model.response.LoginResponse;
import fr.sendme.model.response.UserResponse;
import fr.sendme.service.AuthenticationService;
import fr.sendme.service.JwtService;
import fr.sendme.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/auth")
@RestController
public class AuthenticationController {

    private final JwtService jwtService;
    private final AuthenticationService authenticationService;
    private final UserService userService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService,
                                    UserService userService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserResponse> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(userService.genereUserResponse(registeredUser));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setToken(jwtToken);
        loginResponse.setExpiresIn(jwtService.getExpirationTime());

        return ResponseEntity.ok(loginResponse);
    }
}