export const fileToBase64String = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result as string);
      } else {
        reject();
      }
    };
    reader.readAsDataURL(file);
  });
