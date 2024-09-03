"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { TriangleAlert } from "lucide-react";
import { useState, type ComponentProps } from "react";
import { useForm } from "react-hook-form";
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
import { applicantSchema, type ApplicantSchema } from "~/schema/applicantInfo";
import { formSchema, type FormData } from "~/schema/form";
import { formSubmit } from "~/server/formSubmit";
import { videoSubmit } from "~/server/videoSubmit";
import { UploadButton } from "~/utils/uploadthing";

const options = schedule.map((program) => ({
  value: program.group,
  label: `${program.group} - ${program.dateRange}`,
}));

export default function ApplySection() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [groups, setGroups] = useState<string[]>([]);
  const [isSubmittingVideoForm, setIsSubmittingVideoForm] = useState(false);

  const handleMultiGroupSelectorChange = (newValue: string[]) => {
    setGroups(newValue);
    setFormValue("groups", newValue);
  };

  const applicantInfoForm = useForm<ApplicantSchema>({
    resolver: zodResolver(applicantSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isSubmittingForm },
    setValue: setFormValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      groups: [],
      why: "",
      experience: "",
      knowledge: "",
      skills: "",
    },
  });

  const applicantDataAppend = async (form: globalThis.FormData) => {
    const applicantInfoNameOk = await applicantInfoForm.trigger("name");
    if (!applicantInfoNameOk) {
      applicantInfoForm.setFocus("name");
      return;
    }
    const applicantInfoPhoneOk = await applicantInfoForm.trigger("phone");
    if (!applicantInfoPhoneOk) {
      applicantInfoForm.setFocus("phone");
      return;
    }
    const applicantInfoEmailOk = await applicantInfoForm.trigger("email");
    if (!applicantInfoEmailOk) {
      applicantInfoForm.setFocus("email");
      return;
    }

    const applicantInfo = applicantInfoForm.getValues();
    form.append("name", applicantInfo.name);
    form.append("phone", applicantInfo.phone);
    form.append("email", applicantInfo.email);
  };

  const onVideoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!videoUrl) return;

    setIsSubmittingVideoForm(true);

    try {
      const form = new FormData();
      form.append("videoURL", videoUrl);
      form.append("groups", JSON.stringify(groups));
      await applicantDataAppend(form);
      await videoSubmit(form);
    } catch (error) {
      console.error("Error submitting video:", error);
      // You might want to set an error state here or show an error message to the user
    } finally {
      setIsSubmittingVideoForm(false);
    }
  };

  const handleFormSubmit = handleSubmit(
    async (payload) => {
      const form = new FormData();
      form.append("groups", JSON.stringify(payload.groups));
      form.append("why", payload.why);
      form.append("experience", payload.experience);
      form.append("knowledge", payload.knowledge);
      form.append("skills", payload.skills);

      await applicantDataAppend(form);

      await formSubmit(form);
    },
    (error) => {
      console.log(error);
    },
  );

  return (
    <section id="apply" className="mb-24">
      <h2 className="mb-6 font-serif text-2xl md:text-3xl">
        Postular al programa de pasantes
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
                {...applicantInfoForm.register("name")}
                placeholder="Tu nombre completo"
                className="w-full"
              />
              {applicantInfoForm.formState.errors.name && (
                <p className="mt-1 text-sm text-red-500">
                  {applicantInfoForm.formState.errors.name?.message}
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
                {...applicantInfoForm.register("phone")}
                placeholder="Tu número de teléfono"
                className="w-full"
              />
              {applicantInfoForm.formState.errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {applicantInfoForm.formState.errors.phone?.message}
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
                {...applicantInfoForm.register("email")}
                placeholder="Tu correo electrónico"
                className="w-full"
              />
              {applicantInfoForm.formState.errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {applicantInfoForm.formState.errors.email?.message}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="border-1 my-4 flex items-center gap-4 border border-solid border-yellow-700 bg-yellow-100 p-4">
        <TriangleAlert className="h-20 w-20 text-yellow-700 md:h-10 md:w-10" />
        <p>
          Puedes elegir entre grabarte y responder las preguntas en un video o
          llenar el formulario con las preguntas escritas. Haz lo que más te
          acomode a ti.
        </p>
      </Card>
      <Tabs defaultValue="video">
        <TabsList className="mb-6">
          <TabsTrigger value="video" className="text-base md:text-lg">
            🎥 Video
          </TabsTrigger>
          <TabsTrigger value="form" className="text-base md:text-lg">
            ✏️ Formulario
          </TabsTrigger>
        </TabsList>
        <TabsContent value="video">
          <Card>
            <CardContent>
              <form onSubmit={onVideoSubmit}>
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
                      values={groups}
                      onValuesChange={handleMultiGroupSelectorChange}
                      loop={false}
                    />
                  </div>
                  <UploadButton
                    endpoint="videoUploader"
                    disabled={!!videoUrl}
                    content={{
                      button({ ready, isUploading, uploadProgress }) {
                        if (videoUrl) return <div>Video subido 🎉</div>;
                        if (isUploading || uploadProgress > 0)
                          return <div>Subiendo...</div>;
                        if (!ready) return <div>...</div>;
                        return "Subir video";
                      },
                    }}
                    className="mt-4 items-start justify-start self-start ut-button:bg-[#937a4b] ut-button:ut-readying:bg-[#0f1e18]"
                    onUploadError={(error) => {
                      alert(error.message);
                    }}
                    onClientUploadComplete={(res) => {
                      // Do something with the response
                      const url = res?.[0]?.url;
                      if (!url) return;
                      setVideoUrl(url);
                    }}
                  />

                  <Button
                    type="submit"
                    className="bg-[#2c5545] px-6 py-3 text-base text-white hover:bg-[#1e3c2f] md:text-lg"
                    disabled={isSubmittingVideoForm}
                  >
                    {isSubmittingVideoForm
                      ? "Enviando..."
                      : "Enviar postulación"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="form">
          <Card>
            <CardContent>
              <form onSubmit={handleFormSubmit} className="mt-6 space-y-6">
                <div>
                  <label
                    htmlFor="groups"
                    className="mb-2 block text-base md:text-lg"
                  >
                    ¿Que grupos de voluntarios te interesan?
                  </label>
                  <GroupMultiSelector
                    values={groups}
                    onValuesChange={handleMultiGroupSelectorChange}
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
                  disabled={isSubmittingForm}
                  className="px-6 py-3 text-lg text-white hover:bg-[#1e3c2f] md:bg-[#2c5545]"
                >
                  {isSubmittingForm ? "Enviando..." : "Enviar postulación"}
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
