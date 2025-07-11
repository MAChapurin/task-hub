import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from '@/shared/ui/accordion';

interface BaseAccordionDemoProps {
  multiple: boolean;
}

export const FAQAccordionSection = ({ multiple }: BaseAccordionDemoProps) => {
  return (
    <div id="faq" className="w-full flex flex-col items-stretch gap-4 py-4">
      <h1 className="text-2xl font-bold text-center">Часто задаваемые вопросы</h1>
      <Accordion defaultValue={['item-1']} openMultiple={multiple} className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Как работает система сообщений?</AccordionTrigger>
          <AccordionPanel>
            <p>
              Наша система позволяет отправлять мгновенные сообщения внутри команды, обеспечивая
              быструю коммуникацию и совместную работу над задачами.
            </p>
            <p>
              Вы можете создавать личные чаты или групповые обсуждения, а также получать уведомления
              о новых сообщениях.
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>Какие графики и аналитика доступны?</AccordionTrigger>
          <AccordionPanel>
            <p>
              В нашем проекте доступны интерактивные графики и диаграммы для отслеживания прогресса,
              анализа задач и статистики по проектам.
            </p>
            <p>
              Вы можете настраивать отображение данных, выбирать разные типы графиков и получать
              подробные отчёты.
            </p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>Можно ли менять тему интерфейса?</AccordionTrigger>
          <AccordionPanel>
            <p>
              Да! В вашем проекте реализована возможность выбора из 10 цветовых тем, что позволяет
              настроить интерфейс под ваши предпочтения.
            </p>
            <p>Меняйте темы в настройках и делайте рабочий процесс более комфортным.</p>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger>Как отображается статистика проекта?</AccordionTrigger>
          <AccordionPanel>
            <p>
              Статистика включает показатели выполнения задач, активность пользователей и прогресс
              по проектам.
            </p>
            <p>
              Все данные представлены в удобных графиках и таблицах для быстрого анализа и принятия
              решений.
            </p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
