package samples.aspectj.demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import samples.aspectj.demo.annotation.PDAlert;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.ThrowableAssert.catchThrowable;

@SpringBootTest
@ExtendWith(OutputCaptureExtension.class)
class DemoApplicationTests {

    @Test
    void contextLoads() {
    }

    // Will use the @FQDN validator to test the Aspect
    @PDAlert(errorCode = 123, labels = {"alpha", "omega"})
    static class ValidatedClassTestClass {
        public ValidatedClassTestClass() throws Exception {
            throw new Exception("foo");
        }
    }

    static class ValidatedMethodTestClass {
        @PDAlert(errorCode = 456, labels = {"foo", "bar"})
        public void doSomething() throws Exception {
            throw new Exception("bar");
        }
    }

    @Test
    @DisplayName("Ensure Aspect triggers on @PDAlert Class Annotated")
    public void testLogCallStackAnnotationOnClassWorks(final CapturedOutput output)
            throws Exception {

        final Throwable thrown =
                catchThrowable(ValidatedClassTestClass::new);
        assertThat(thrown)
                .hasMessageContaining("foo");

        assertThat(output).contains("PDAlert: errorCode: 123, labels: [alpha, omega]");
    }

    @Test
    @DisplayName("Ensure Aspect triggers on @PDAlert Method Annotated")
    public void testLogCallStackAnnotationOnMethodWorks(final CapturedOutput output)
            throws Exception {

        final Throwable thrown =
                catchThrowable(
                        () -> {
                            new ValidatedMethodTestClass().doSomething();
                        });
        assertThat(thrown)
                .hasMessageContaining("bar");

        assertThat(output).contains("PDAlert: errorCode: 456, labels: [foo, bar]");
    }

}
