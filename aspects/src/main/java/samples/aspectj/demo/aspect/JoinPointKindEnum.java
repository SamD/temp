package samples.aspectj.demo.aspect;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum JoinPointKindEnum {
    CONSTRUCTOR_EXECUTION("constructor-execution"),
    METHOD_EXECUTION("method-execution");
    @Getter private String value;
}
