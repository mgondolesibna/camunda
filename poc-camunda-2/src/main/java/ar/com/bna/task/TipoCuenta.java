package ar.com.bna.task;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

public class TipoCuenta implements JavaDelegate {

    public void execute(DelegateExecution execution) throws Exception {

        System.out.println("Proceso Tipo de Cuenta");

        String apellido = getFormField(execution, "apellido");
        // String tipoPersona = getFormField(execution, "tipoPersona");
        String tipoCuenta = getFormField(execution, "tipoCuenta");
        String emitirChequera = getFormField(execution, "emitirChequera");
        String nombre = getFormField(execution, "nombre");
        String cuit = getFormField(execution, "cuit");
        // String rubro = getFormField(execution, "rubro");
        // String provincia = getFormField(execution, "provincia");
        // String solicitaTD = getFormField(execution, "solicitaTD");
        // String solicitaCQE = getFormField(execution, "solicitaCQE");
        // String solicitaCQF = getFormField(execution, "solicitaCQF");

        // System.out.println("Cuit: " + cuit);
        // System.out.println("Persona: " + tipoPersona);
        // System.out.println("Apellido: " + apellido);
        // System.out.println("Nombre: " + nombre);
        // System.out.println("Tipo de cuenta: " + tipoCuenta);
        // System.out.println("Tipo de dato de tipoCuenta: " + tipoCuenta.getClass().getName());
        // System.out.println("Emitir Chequera: " + emitirChequera);
        // System.out.println("Rubro: " + rubro);
        // System.out.println("Provincia: " + provincia);
        // System.out.println("Solicita Tarjeta de Débito?: " + solicitaTD);


        // execution.setVariable("estaBienElCuit", estaBienElCuit);
        execution.setVariable("tipoCuenta", tipoCuenta);
        execution.setVariable("apellido", apellido);
        execution.setVariable("nombre", nombre);
        execution.setVariable("emitirChequera", emitirChequera);
        execution.setVariable("cuit", cuit);

        // if (!estaBienElCuit) {
        // execution.setVariable(Variables.FINAL_MESSAGE, "Se trata de un usuario
        // existente");
        // System.out.println(Variables.FINAL_MESSAGE);

        // } else {
        // execution.setVariable(Variables.FINAL_MESSAGE, "Salí por el else");
        // System.out.println(Variables.FINAL_MESSAGE);

        // }

    }

    private String getFormField(DelegateExecution execution, String formField) {
        return String.valueOf(execution.getVariable(formField));
    }

}
