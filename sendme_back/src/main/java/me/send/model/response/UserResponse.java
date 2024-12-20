package me.send.model.response;

import me.send.model.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.Date;

@Setter
@Getter
public class UserResponse {
    private String fullName;
    private String username;
    private String email;
    private Date createdAt;
    private Date updatedAt;
    private boolean isAccountNonExpired;
    private boolean isAccountNonLocked;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;
    private Collection<Role> roles;
}
