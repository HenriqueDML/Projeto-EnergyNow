package br.com.energynow.Resources;

import br.com.energynow.Exceptions.CEPInvalidoException;
import br.com.energynow.Service.UserService;
import br.com.energynow.model.User;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.sql.SQLException;


@Path("usuarios")
public class UserResource {
    UserService userService = new UserService ();

    @POST
    @Path("cadastro")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response cadastrar(User user) {

        try{
            user = userService.cadastro (user);
            return Response.ok (user).build ();

        } catch (SQLException e) {
            if (e.getErrorCode () == 1) {
                return Response.status (Response.Status.CONFLICT)
                        .entity ("{\"error\":\"Usuário já cadastrado.\"}")
                        .build ();
            } else {
                return Response.status (Response.Status.INTERNAL_SERVER_ERROR)
                        .entity ("{\"error\":\"Erro inesperado: " + e.getMessage () + "\"}")
                        .build ();
            }
        } catch (CEPInvalidoException e) {
            throw new RuntimeException (e);
        }
    }

    @POST
    @Path("login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(User user) {

        try {
            user = userService.login (user);

            return Response.ok(user).build();
        }catch (SQLException e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\":\"Usuário não encontrado ou senha incorreta.\"}")
                    .build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Erro inesperado: " + e.getMessage() + "\"}")
                    .build();
        }
    }

    @PUT
    @Path ("update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update (User user){

        try {
            userService.update (user);
            return Response.accepted ().build ();

        }catch (SQLException e){
            return Response.status (Response.Status.BAD_REQUEST)
                    .entity ("{\"error\":\"Erro ao atualizar dados.\"\n"+ e.getMessage() + "\"}")
                    .build ();
        }

    }

    @DELETE
    @Path ("delete/{email}")
    public Response delete (@PathParam ("email") String email){

        try {
            userService.delete (email);
            return Response.noContent().build();

        }catch (SQLException e){
            return Response.status (Response.Status.NOT_FOUND)
                    .entity ("{\"error\":\"Usuário não encontrado.\"}")
                    .build ();
        }

    }




}
