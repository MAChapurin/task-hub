import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { HeaderMarketing } from '@/widgets';
import { FAQAccordionSection } from '@/widgets/faq-section';

import {
  ArrowRightIcon,
  BarChartIcon,
  CheckCircleIcon,
  LayoutDashboardIcon,
  ListTodoIcon,
  MessageSquareIcon,
  UsersIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MarketingPage() {
  return (
    <div>
      <HeaderMarketing />
      <main className="flex-1 min-h-screen w-full flex flex-col items-center justify-center  p-2 md:p-4 mx-auto scroll-smooth">
        <section
          id="home"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950"
        >
          <div className="max-w-400 container px-4 md:px-6 mx-auto grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                Оптимизируйте свои проекты, расширьте возможности своей команды
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 lg:mx-0">
                Лучшая платформа для управления проектами, совместной работы и отслеживания задач.
                Организуйтесь, оставайтесь на связи и быстрее достигайте своих целей.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="#" passHref>
                  <Button className="inline-flex h-12 items-center justify-center rounded-md bg-gray-900 px-8 text-base font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                    Начать
                  </Button>
                </Link>
                <Link href="#" passHref>
                  <Button
                    variant="outline"
                    className="inline-flex h-12 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-base font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  >
                    Узнать больше
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden lg:flex justify-center">
              <Image
                src="/taskhub-dashboard.jpg"
                width={700}
                height={500}
                alt="Project Management Dashboard"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6 mx-auto max-w-400">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Мощные функции для бесперебойной совместной работы
                </h2>
                <p className="mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Всё необходимое для управления проектами, общения с командой и отслеживания
                  прогресса на одной интуитивно понятной платформе.
                </p>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 w-full">
                <Card className="flex flex-col items-center p-6 text-center">
                  <CheckCircleIcon className="h-12 w-12 text-gray-900 dark:text-gray-50 mb-4" />
                  <CardTitle className="text-xl font-bold mb-2">Создание проекта</CardTitle>
                  <CardContent className="text-gray-500 dark:text-gray-400 p-0">
                    Легко создавайте и организуйте новые проекты с помощью настраиваемых параметров.
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center p-6 text-center">
                  <UsersIcon className="h-12 w-12 text-gray-900 dark:text-gray-50 mb-4" />
                  <CardTitle className="text-xl font-bold mb-2">
                    Управление пользователями
                  </CardTitle>
                  <CardContent className="text-gray-500 dark:text-gray-400 p-0">
                    Добавляйте и управляйте членами команды, назначайте роли и контролируйте доступ.
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center p-6 text-center">
                  <MessageSquareIcon className="h-12 w-12 text-gray-900 dark:text-gray-50 mb-4" />
                  <CardTitle className="text-xl font-bold mb-2">
                    Обмен сообщениями в реальном времени
                  </CardTitle>
                  <CardContent className="text-gray-500 dark:text-gray-400 p-0">
                    Мгновенно общайтесь с членами вашей команды в рамках проектов.
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center p-6 text-center">
                  <ListTodoIcon className="h-12 w-12 text-gray-900 dark:text-gray-50 mb-4" />
                  <CardTitle className="text-xl font-bold mb-2">Управление задачами</CardTitle>
                  <CardContent className="text-gray-500 dark:text-gray-400 p-0">
                    Создавайте, назначайте и отслеживайте задачи с указанием сроков выполнения и
                    приоритетов.
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center p-6 text-center">
                  <LayoutDashboardIcon className="h-12 w-12 text-gray-900 dark:text-gray-50 mb-4" />
                  <CardTitle className="text-xl font-bold mb-2">Интерактивная доска</CardTitle>
                  <CardContent className="text-gray-500 dark:text-gray-400 p-0">
                    Визуализируйте и обновляйте статусы задач с помощью интуитивно понятной панели с
                    функцией перетаскивания.
                  </CardContent>
                </Card>
                <Card className="flex flex-col items-center p-6 text-center">
                  <BarChartIcon className="h-12 w-12 text-gray-900 dark:text-gray-50 mb-4" />
                  <CardTitle className="text-xl font-bold mb-2">Аналитика проекта</CardTitle>
                  <CardContent className="text-gray-500 dark:text-gray-400 p-0">
                    Получайте информацию с помощью различных графиков и статистических данных о ходе
                    выполнения проектов и задач.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6 mx-auto max-w-400">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Как наша платформа меняет ваш рабочий процесс
                </h2>
                <p className="mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  От идеи до реализации наша платформа проведет вас через каждый этап вашего
                  проекта.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 text-xl font-bold">
                      1
                    </div>
                    <CardTitle className="mt-4 text-xl font-bold">
                      Создавать и организовывать
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-500 dark:text-gray-400 p-0">
                    Начните с создания нового проекта и определения его масштаба. Организуйте задачи
                    в списки и расставьте приоритеты.
                  </CardContent>
                </Card>
                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 text-xl font-bold">
                      2
                    </div>
                    <CardTitle className="mt-4 text-xl font-bold">Сотрудничайте легко</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-500 dark:text-gray-400 p-0">
                    Приглашайте свою команду, назначайте задачи и общайтесь в режиме реального
                    времени. Держите всех в курсе событий.
                  </CardContent>
                </Card>
                <Card className="p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 text-xl font-bold">
                      3
                    </div>
                    <CardTitle className="mt-4 text-xl font-bold">
                      Отслеживать и анализировать
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-500 dark:text-gray-400 p-0">
                    Отслеживайте прогресс с помощью интерактивной доски и получайте ценную
                    информацию из подробной статистики проекта.
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6 mx-auto max-w-400">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Что говорят наши пользователи
                </h2>
                <p className="mx-auto max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Послушайте мнения команд, которые повысили свою производительность с помощью нашей
                  платформы.
                </p>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
                <Card className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarImage alt="User 1" src="https://github.com/shadcn.png" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-semibold mb-2">
                    «Это переломный момент в жизни нашей команды!»
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    «Эта платформа произвела революцию в управлении проектами. Интерактивная доска
                    невероятно интуитивно понятна, а функция обмена сообщениями позволяет всем
                    оставаться на связи».
                  </p>
                  <div className="font-medium">- Jane Doe, Project Manager</div>
                </Card>
                <Card className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarImage alt="User 2" src="https://github.com/shadcn.png" />
                    <AvatarFallback>AS</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-semibold mb-2">
                    «Значительно повысилась наша производительность».
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    «Аналитические панели предоставляют бесценную информацию о нашем рабочем
                    процессе. Теперь мы можем легко выявлять узкие места и оптимизировать наши
                    процессы».
                  </p>
                  <div className="font-medium">- Alex Smith, CEO</div>
                </Card>
                <Card className="p-6 flex flex-col items-center text-center">
                  <Avatar className="h-16 w-16 mb-4">
                    <AvatarImage alt="User 3" src="https://github.com/shadcn.png" />
                    <AvatarFallback>MB</AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-semibold mb-2">
                    «Лучший инструмент для совместной работы, который мы когда-либо использовали».
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    «От создания задач до общения в режиме реального времени — эта платформа
                    предлагает всё, что нужно нашей agile-команде. Настоятельно рекомендуем её для
                    любого растущего бизнеса».
                  </p>
                  <div className="font-medium">- Maria Brown, Team Lead</div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-900 text-gray-50 dark:bg-gray-950 dark:text-gray-50">
          <div className="container px-4 md:px-6 mx-auto max-w-400 text-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Готовы ли вы преобразовать управление своими проектами?
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl dark:text-gray-400">
                Присоединяйтесь к десяткам команд, которые уже добиваются больших результатов с
                помощью нашей интуитивно понятной и мощной платформы.
              </p>
              <Link href="#" passHref>
                <Button className="inline-flex h-10 items-center justify-center rounded-md bg-gray-50 px-8 text-sm font-medium text-gray-900 shadow transition-colors hover:bg-gray-50/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">
                  Начните бесплатную пробную версию
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        <section className="container px-4 md:px-6 mx-auto max-w-400 text-center">
          <FAQAccordionSection multiple />
        </section>
      </main>
    </div>
  );
}
