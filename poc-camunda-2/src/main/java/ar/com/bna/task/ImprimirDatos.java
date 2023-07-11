// package ar.com.bna.task;
// import org.camunda.bpm.engine.delegate.DelegateExecution;
// import org.camunda.bpm.engine.delegate.JavaDelegate;


// public class ImprimirDatos implements JavaDelegate {
    
//     public void execute(DelegateExecution execution) throws Exception {

//         String apellido = getFormField(execution, "apellido");
//         String tipoCuenta = getFormField(execution, "tipoCuenta");
//         String emitirChequera = getFormField(execution, "emitirChequera");
//         String nombre = getFormField(execution, "nombre");
        
//         System.out.println("Apellido: " + apellido);
//         System.out.println("Nombre: " + nombre);
//         System.out.println("Tipo de cuenta: " + tipoCuenta);
//         System.out.println("Emitir Chequera: " + emitirChequera);

//     }

//     private String getFormField(DelegateExecution execution, String formField) {
//         return String.valueOf(execution.getVariable(formField));
//     }
// }

package ar.com.bna.task;

import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

import java.util.Map;

public class ImprimirDatos implements JavaDelegate {

    public void execute(DelegateExecution execution) throws Exception {

        System.out.println("===========================================================");
        System.out.println("Acá voy a imprimir los datos");

        Map<String, Object> variables = execution.getVariables();

        for (Map.Entry<String, Object> entry : variables.entrySet()) {
            String fieldName = entry.getKey();
            Object fieldValue = entry.getValue();
            String formattedFieldName = formatFieldName(fieldName);
            System.out.println(formattedFieldName + ": " + fieldValue);
        }

    }

    private String formatFieldName(String fieldName) {
        StringBuilder formattedName = new StringBuilder();
        boolean capitalizeNext = true;
    
        for (int i = 0; i < fieldName.length(); i++) {
            char c = fieldName.charAt(i);
    
             if (Character.isUpperCase(c)) {
                formattedName.append(' ');
            }
            
            if (Character.isLetter(c)) {
                if (capitalizeNext) {
                    c = Character.toUpperCase(c);
                    capitalizeNext = false;
                }
            } else {
                capitalizeNext = true;
            }

           
    
            formattedName.append(c);
        }
    
        return formattedName.toString();
    }
}
