package br.com.energynow.Resources;

import br.com.energynow.DTO.CalcuraloraGerenDTO;
import br.com.energynow.DTO.GerenciamentoDTO;
import br.com.energynow.Service.GerenciamentoService;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;

import java.sql.SQLException;
import java.util.List;

@Path("gerenciamento")
public class GerenciamentoResouce {
    GerenciamentoService gerenService = new GerenciamentoService ();

    @POST
    @Path("create")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response create(GerenciamentoDTO geren) {
        try {
            gerenService.create (geren);
            return Response.ok ().build ();

        } catch (SQLException e) {
            if (e.getErrorCode () == 0) {
                return Response.status (Response.Status.NOT_FOUND)
                        .entity ("{\"error\":\"Usuario não encontrado\"}")
                        .build ();
            } else {
                return Response.status (Response.Status.INTERNAL_SERVER_ERROR)
                        .entity ("{\"error\":\"Erro inesperado: " + e.getMessage () + "\"}")
                        .build ();
            }
        }
    }

    @POST
    @Path("createGrup")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createGrup(CalcuraloraGerenDTO geren) {
        try {
            gerenService.createGrupo (geren);
            return Response.ok ().build ();

        } catch (SQLException e) {
            if (e.getErrorCode () == 0) {
                return Response.status (Response.Status.NOT_FOUND)
                        .entity ("{\"error\":\"Usuario não encontrado\"}")
                        .build ();
            } else {
                return Response.status (Response.Status.INTERNAL_SERVER_ERROR)
                        .entity ("{\"error\":\"Erro inesperado: " + e.getMessage () + "\"}")
                        .build ();
            }
        }
    }

    @GET
    @Path ("getLista/{email}/{n}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLista(@PathParam ("email")String email,@PathParam ("n")int n ){
        try {
            List<GerenciamentoDTO> list = gerenService.getList (email, n);
            return Response.ok(list).build();
        } catch (SQLException e) {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\":\"Erro inesperado: " + e.getMessage() + "\"}")
                    .build();
        }
        catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\":\"Erro inesperado: " + e.getMessage() + "\"}")
                    .build();
        }
    }

    @PUT
    @Path ("update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response update (GerenciamentoDTO geren){

        try {
            gerenService.update (geren);
            return Response.accepted ().build ();
        }catch (SQLException e){
            return Response.status (Response.Status.BAD_REQUEST)
                    .entity ("{\"error\":\"Erro ao atualizar dados.\"\n"+ e.getMessage() + "\"}")
                    .build ();
        }
    }

    @DELETE
    @Path ("delete/{id}")
    public Response delete (@PathParam ("id") int id) {

        try {
            gerenService.delete (id);
            return Response.noContent ().build ();

        } catch (SQLException e) {
            return Response.status (Response.Status.NOT_FOUND)
                    .entity ("{\"error\":\"Usuário não encontrado.\"}")
                    .build ();
        }
    }
}
