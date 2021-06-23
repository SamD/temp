package samples.aspectj.demo.config;

import org.aspectj.lang.Aspects;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;
import samples.aspectj.demo.aspect.PDAlertAspect;

/**
 * A Spring configuration that ensures that Load-Time Weaving is always on.
 *
 * <p>Based on Justin Wilson's blog article,
 * <a href="https://www.credera.com/blog/technology-insights/open-source-technology-insights/aspect-oriented-programming-in-spring-boot-part-3-setting-up-aspectj-load-time-weaving/">
 * Aspect-Oriented Programming in Spring Boot Part 3: Setting up AspectJ Load-Time Weaving</a>.
 * Unfortunately, the blog article indicates that an exception will be thrown automatically if
 * {@code AspectJWeaving.ENABLED}</code> is passed and {@code aop.xml} is missing; this does not
 * seem to be the case.</p>
*/
@Configuration
//@EnableAspectJAutoProxy(proxyTargetClass = true)
@EnableCaching(mode = AdviceMode.ASPECTJ)
@EnableLoadTimeWeaving(aspectjWeaving = EnableLoadTimeWeaving.AspectJWeaving.ENABLED)
public class DemoConfiguration {
/*
    @Bean
    public PDAlertAspect pdAlertAspect() {
        return Aspects.aspectOf(PDAlertAspect.class);
    }
*/

}
