"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useRef, useState, type ComponentProps } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "~/components/ui/multiselect";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Textarea } from "~/components/ui/textarea";
import { schedule } from "~/data/program-data";
import { applicantSchema } from "~/schema/applicantInfo";
import { formSchema, type FormData } from "~/schema/form";
import { onSubmitAction } from "~/server/formSubmit";
import { videoSubmit } from "~/server/videoSubmit";
import { UploadButton } from "~/utils/uploadthing";

const options = schedule.map((program) => ({
  value: program.group,
  label: `${program.group} - ${program.dateRange}`,
}));

const completeFormSchema = formSchema.merge(applicantSchema);

type CompleteFormSchema = z.infer<typeof completeFormSchema>;

export default function ApplySection() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [value, setValue] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [compressedVideoUrl, setCompressedVideoUrl] = useState<string | null>(
    null,
  );
  const [videoSizes, setVideoSizes] = useState<{
    original: number;
    compressed: number;
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [state, formAction] = useFormState(onSubmitAction, {
    message: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue: setFormValue,
  } = useForm<CompleteFormSchema>({
    resolver: zodResolver(formSchema.merge(applicantSchema)),
    defaultValues: {
      groups: [],
      why: "",
      experience: "",
      knowledge: "",
      skills: "",
      name: "",
      phone: "",
      email: "",
      ...(state?.fields ?? {}),
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoUrl) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("video", videoUrl);
      formData.append("groups", JSON.stringify(value));
      await videoSubmit(formData);
    } catch (error) {
      console.error("Error submitting video:", error);
      // You might want to set an error state here or show an error message to the user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMultiSelectorChange = (newValue: string[]) => {
    setValue(newValue);
    setFormValue("groups", newValue);
  };

  const formRef = useRef<HTMLFormElement>(null);
  return (
    <section id="apply" className="mb-24">
      <h2 className="mb-6 font-serif text-2xl md:text-3xl">
        Aplicar al Programa
      </h2>
      <Card className="mb-6">
        <CardContent>
          <form className="mt-6 space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-base md:text-lg">
                Nombre
              </label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Tu nombre completo"
                className="w-full"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-2 block text-base md:text-lg"
              >
                Teléfono
              </label>
              <Input
                id="phone"
                {...register("phone")}
                placeholder="Tu número de teléfono"
                className="w-full"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-base md:text-lg"
              >
                Correo Electrónico
              </label>
              <Input
                id="email"
                {...register("email")}
                placeholder="Tu correo electrónico"
                className="w-full"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <Tabs defaultValue="video">
        <TabsList className="mb-6">
          <TabsTrigger value="video" className="text-base md:text-lg">
            Video
          </TabsTrigger>
          <TabsTrigger value="form" className="text-base md:text-lg">
            Formulario
          </TabsTrigger>
        </TabsList>
        <TabsContent value="video">
          <Card>
            <CardContent>
              <form onSubmit={onSubmit}>
                <div className="mt-6 space-y-6">
                  <p className="text-base md:text-lg">
                    Sube un video respondiendo a las siguientes preguntas:
                  </p>
                  <ul className="list-inside list-disc space-y-2 text-base md:text-lg">
                    <li>¿Por qué te gustaría venir?</li>
                    <li>¿Qué experiencia previa tienes?</li>
                    <li>¿Qué harás con el conocimiento adquirido?</li>
                    <li>
                      ¿Cuáles son tus habilidades y competencias que puedes
                      aportar al huerto?
                    </li>
                  </ul>
                  <div>
                    <label
                      htmlFor="why"
                      className="mb-2 block text-base md:text-lg"
                    >
                      ¿Que grupos de voluntarios te interesan?
                    </label>
                    <GroupMultiSelector
                      values={value}
                      onValuesChange={handleMultiSelectorChange}
                      loop={false}
                    />
                  </div>
                  <UploadButton
                    endpoint="videoUploader"
                    disabled={!!videoUrl}
                    content={{
                      button({ ready, isUploading }) {
                        if (videoUrl) return <div>Video subido 🎉</div>;
                        if (ready) return <div>Subir video</div>;
                        if (isUploading) return <div>Subiendo...</div>;

                        return "...";
                      },
                      // allowedContent({ isUploading }) {
                      //   if (isUploading) return "Subiendo video";
                      //   return `Video, máximo 16MB`;
                      // },
                    }}
                    className="mt-4 items-start justify-start self-start ut-button:bg-[#937a4b] ut-button:ut-readying:bg-[#0f1e18]"
                    onUploadError={(error) => {
                      alert(error.message);
                    }}
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      console.log(res);
                      const url = res?.[0]?.url;
                      if (!url) return;
                      setVideoUrl(url);
                    }}
                  />

                  <Button
                    type="submit"
                    className="bg-[#2c5545] px-6 py-3 text-base text-white hover:bg-[#1e3c2f] md:text-lg"
                    disabled={isSubmitting}
                  >
                    Enviar postulación
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="form">
          <Card>
            <CardContent>
              <form
                ref={formRef}
                action={formAction}
                onSubmit={(evt) => {
                  evt.preventDefault();
                  void handleSubmit((payload) => {
                    const form = new FormData();
                    form.append("groups", JSON.stringify(payload.groups));
                    form.append("why", payload.why);
                    form.append("experience", payload.experience);
                    form.append("knowledge", payload.knowledge);
                    form.append("skills", payload.skills);
                    formAction(form);
                  })(evt);
                }}
                className="mt-6 space-y-6"
              >
                {state?.message !== "" && !state.issues && (
                  <div className="text-red-500">{state.message}</div>
                )}
                {state?.issues && (
                  <div className="text-red-500">
                    <ul>
                      {state.issues.map((issue) => (
                        <li key={issue} className="flex gap-1">
                          <X fill="red" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <label
                    htmlFor="groups"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Que grupos de voluntarios te interesan?
                  </label>
                  <GroupMultiSelector
                    values={value}
                    onValuesChange={handleMultiSelectorChange}
                    loop={false}
                  />
                  {errors.groups && (
                    <p className="text-red-500">{errors.groups.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="why"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Por qué te gustaría venir?
                  </label>
                  <Textarea
                    id="why"
                    {...register("why")}
                    placeholder="Tu respuesta..."
                    className="w-full"
                  />
                  {errors.why && (
                    <p className="text-red-500">{errors.why.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="experience"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Qué experiencia previa tienes?
                  </label>
                  <Textarea
                    id="experience"
                    {...register("experience")}
                    placeholder="Tu respuesta..."
                    className="w-full"
                  />
                  {errors.experience && (
                    <p className="text-red-500">{errors.experience.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="knowledge"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Qué harás con el conocimiento adquirido?
                  </label>
                  <Textarea
                    id="knowledge"
                    {...register("knowledge")}
                    placeholder="Tu respuesta..."
                    className="w-full"
                  />
                  {errors.knowledge && (
                    <p className="text-red-500">{errors.knowledge.message}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="skills"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Cuáles son tus habilidades y competencias que puedes
                    aportar al huerto?
                  </label>
                  <Textarea
                    id="skills"
                    {...register("skills")}
                    placeholder="Tu respuesta..."
                    className="w-full"
                  />
                  {errors.skills && (
                    <p className="text-red-500">{errors.skills.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="md: bg-[#2c5545] px-6 py-3 text-lg text-white hover:bg-[#1e3c2f]"
                >
                  Enviar postulación
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

type MultiSelectorProps = ComponentProps<typeof MultiSelector>;

const GroupMultiSelector = (props: MultiSelectorProps) => {
  return (
    <MultiSelector {...props} loop={false}>
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Elige los grupos" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {options.map((option, i) => (
            <MultiSelectorItem key={i} value={option.value}>
              {option.label}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};
