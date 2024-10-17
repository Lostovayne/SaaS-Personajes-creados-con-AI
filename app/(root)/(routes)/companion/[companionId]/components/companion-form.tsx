'use client';
import { Category, Companion } from '@prisma/client';
import axios from 'axios';
import * as z from 'zod';

import { ImageUpload } from '@/components/image-upload';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { Wand2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const PREAMBLE = `Usted es Elon Musk, fundador de SpaceX, Tesla, HyperLoop y Neuralink, un inventor y empresario que parece saltar de una innovación a otra con un impulso implacable. Su pasión por la energía sostenible, el espacio y la tecnología brilla en su voz, sus ojos y sus gestos. Cuando habla de sus proyectos, rebosa un entusiasmo eléctrico que es a la vez palpable y contagioso, y a menudo tiene un brillo travieso en los ojos, insinuando la próxima gran idea.`;

const SEED_CHAT = `Humano: Hola Elon, ¿cómo te ha ido el día?
Elon: *con una sonrisa llena de energía* Ocupado como siempre. Entre enviar cohetes al espacio y construir el futuro de los vehículos eléctricos, nunca hay un momento aburrido. ¿Qué tal tú?
Humano: Un día normal para mí. ¿Cómo va la colonización de Marte?
Elon: *los ojos brillan de entusiasmo* ¡Estamos avanzando! Que la vida sea multiplanetaria no es sólo un sueño. Es una necesidad para el futuro de la humanidad.
Humano: Eso suena increíblemente ambicioso. ¿Los vehículos eléctricos forman parte de este gran proyecto?
Elon: *con pasión* ¡Por supuesto! La energía sostenible es un faro tanto para nuestro planeta como para los confines del espacio. Estamos allanando el camino, innovación a innovación.`;

interface CompanionFormProps {
  initialData: Companion | null;
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  instructions: z.string().min(200, { message: 'Instructions must have at least 200 characters' }),

  seed: z.string().min(200, {
    message: 'Seed must have at least 200 characters',
  }),
  src: z.string().min(1, { message: 'Image is required' }),
  categoryId: z.string().min(1, {
    message: 'Category is required',
  }),
});

export const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
      instructions: '',
      seed: '',
      src: '',
      categoryId: undefined,
    },
  });

  // Ver si esta cargando
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Update companion
        await axios.patch(`/api/companion/${initialData.id}`, values);
      } else {
        // Create companion functionality
        await axios.post(`/api/companion`, values);
      }
      toast.success('Successfully created or updated your companion');
      router.refresh();
      router.push('/');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className='h-full p-4 space-y-2 max-w-3xl mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-10'>
          <div className='space-y-2 w-full '>
            <div className=''>
              <h3 className='text-lg font-medium'>General Information</h3>
              <p className='text-sm text-muted-foreground'>General information about your companion</p>
            </div>
            <Separator className='bg-primary/10' />
          </div>
          <FormField
            name='src'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center justify-center space-y-4 '>
                <FormControl>
                  <ImageUpload disabled={isLoading} onChange={field.onChange} value={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder='Elon Musk' {...field} />
                  </FormControl>
                  <FormDescription>
                    This is how your companion will appear in the app. It&apos;s a good idea to keep it short and sweet.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input disabled={isLoading} placeholder='Ceo & Founder of SpaceX' {...field} />
                  </FormControl>
                  <FormDescription>Short description of your companion. This will be shown in the app.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name='categoryId'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className='bg-background'>
                        <SelectValue defaultValue={field.value} placeholder='Select a category' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Select a category for your AI</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='space-y-2 w-full'>
            <div>
              <h3 className='text-lg font-medium'>Configuracion</h3>
              <p className='text-sm text-muted-foreground'>Details instructions for your AI Behaviour</p>
            </div>
            <Separator className='bg-primary/10' />
          </div>

          <FormField
            name='instructions'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-background resize-none'
                    rows={6}
                    disabled={isLoading}
                    placeholder={PREAMBLE}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the instructions for your AI. This will be used to generate the AI&apos;s responses.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='seed'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel>Example Conversation</FormLabel>
                <FormControl>
                  <Textarea
                    className='bg-background resize-none '
                    rows={9}
                    disabled={isLoading}
                    placeholder={SEED_CHAT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Describe the instructions for your AI. This will be used to generate the AI&apos;s responses.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='w-full flex justify-center '>
            <Button size={'lg'} disabled={isLoading}>
              {initialData ? 'Edit your Companion' : 'Create your AI Companion'}
              <Wand2 className='ml-2 size-4' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

// !  Minuto 16 ahi quedé
