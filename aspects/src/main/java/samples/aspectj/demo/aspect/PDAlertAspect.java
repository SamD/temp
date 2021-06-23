package samples.aspectj.demo.aspect;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.ConstructorSignature;
import org.aspectj.lang.reflect.MethodSignature;
import samples.aspectj.demo.annotation.PDAlert;

import java.lang.annotation.Annotation;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.Optional;

@Aspect
@Slf4j
public class PDAlertAspect {

    // This is for all aspects a global off flag
    private static final boolean IS_AOP_DISABLED =
            StringUtils.isNotBlank(System.getenv("IS_AOP_DISABLED"));


    /**
     * Any class annotated @PDAlert
     */
    @Pointcut("within(samples.aspectj.demo..*) && @within(samples.aspectj.demo.annotation.PDAlert) && if()")
    public static boolean beanAnnotatedWithPDAlert() {
        /*NOOP*/
        return !IS_AOP_DISABLED;
    }

    /**
     * Methods annotated with @PDAlert
     */
    @Pointcut("within(samples.aspectj.demo..*) && execution(@samples.aspectj.demo.annotation.PDAlert * *(..)) && if()")
    public static boolean methodAnnotatedWithPDAlert() {
        /*NOOP*/
        return !IS_AOP_DISABLED;
    }

    /**
     * If a class or method with @PDAlert and throws an exception
     *
     * @param ex
     * @throws Throwable
     */
    @AfterThrowing(pointcut = "beanAnnotatedWithPDAlert() || methodAnnotatedWithPDAlert()", throwing = "ex")
    public void logAfterThrowingAllMethods(final JoinPoint joinPoint, final Throwable ex) throws Throwable {
        // the target that is having its field set
        final Object target = joinPoint.getTarget();
        final Class targetClass = target.getClass();

        final Annotation[] classAnnotations = targetClass.getAnnotations();
        // check if @PDAlert is on the class if not look at the method
        findPdAlertAnnotation(classAnnotations).ifPresentOrElse(
                pdAlert -> handleClassLevel(targetClass, pdAlert),
                () -> handleMethodLevel(targetClass, joinPoint)
        );
    }

    void handleClassLevel(final Class targetClass, final PDAlert pdAlert) {
        log.info("handleClassLevel: Class: {}", targetClass.getSimpleName());
        doAlert(pdAlert);
    }

    void handleMethodLevel(final Class targetClass, final JoinPoint joinPoint) {
        final String kind = joinPoint.getStaticPart().getKind();
        Annotation[] targetAnnotations;
        String name;
        switch (kind) {
            case JoinPoint.METHOD_EXECUTION:
                final MethodSignature methodSignature = (MethodSignature) joinPoint.getSignature();
                final Method method = methodSignature.getMethod();
                name = method.getName();
                targetAnnotations = method.getAnnotations();
                break;
            case JoinPoint.CONSTRUCTOR_EXECUTION:
                final ConstructorSignature constructorSignature = (ConstructorSignature) joinPoint.getSignature();
                final Constructor constructor = constructorSignature.getConstructor();
                name = constructor.getName();
                targetAnnotations = constructor.getAnnotations();
                break;
            default:
                throw new IllegalStateException("Unexpected value: " + kind);
        }

        log.info("handleMethodLevel: Class: {}, MethodName: {}", targetClass.getSimpleName(), name);
        final Optional<PDAlert> methoOrConstructorPDAnnotation = findPdAlertAnnotation(targetAnnotations);
        methoOrConstructorPDAnnotation.ifPresentOrElse(
                this::doAlert,
                // shouldn't happen
                () -> log.error("Expected to find @PDAlert on class: {}, target: {}", targetClass.getSimpleName(), name)
        );
    }

    void doAlert(final PDAlert pdAlert) {
        final int errorCode = pdAlert.errorCode();
        final String[] labels = pdAlert.labels();
        log.info("PDAlert: errorCode: {}, labels: {}", errorCode, labels);
    }

    Optional<PDAlert> findPdAlertAnnotation(final Annotation[] annotations) {
        return Arrays.stream(annotations)
                .filter(annotation -> annotation.annotationType() == PDAlert.class)
                .map(annotation -> (PDAlert) annotation)
                .findFirst();
    }


}
