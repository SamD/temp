package samples.aspectj.demo.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Annotation when added to a class or method to indicate if PDAlert processing should be applied
 */
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.CONSTRUCTOR, ElementType.METHOD})
public @interface PDAlert {
    String message() default "";
    Class<?>[] groups() default {};
    int errorCode() default 0;
    String[] labels() default "";
}
