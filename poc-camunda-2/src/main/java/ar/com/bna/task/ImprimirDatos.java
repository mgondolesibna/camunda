package ar.com.bna.task;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;


public class ImprimirDatos implements JavaDelegate {
    
    public void execute(DelegateExecution execution) throws Exception {

        String apellido = getFormField(execution, "apellido");
        String tipoCuenta = getFormField(execution, "tipoCuenta");
        String emitirChequera = getFormField(execution, "emitirChequera");
        String nombre = getFormField(execution, "nombre");
        
        System.out.println("Apellido: " + apellido);
        System.out.println("Nombre: " + nombre);
        System.out.println("Tipo de cuenta: " + tipoCuenta);
        System.out.println("Emitir Chequera: " + emitirChequera);

    }

    private String getFormField(DelegateExecution execution, String formField) {
        return String.valueOf(execution.getVariable(formField));
    }
}
