interface WrapperFormProps {
      titleForm: string;
      descriptionForm: string;
      children: React.ReactNode;
}

export const WrapperForm: React.FC<WrapperFormProps> = ({
      titleForm,
      descriptionForm,
      children,
}): JSX.Element => {
      return (
            <section className="w-full sm:w-[500px] bg-white text-center flex flex-col items-center justify-center space-y-4 border rounded-lg p-8 shadow-lg">
                  <h2 className='w-full font-bold text-slate-900 uppercase'>
                        {titleForm}
                  </h2>
                  <p className="w-full pb-2 text-gray-500"> {descriptionForm} </p>
                  {children}
            </section>
      );
};