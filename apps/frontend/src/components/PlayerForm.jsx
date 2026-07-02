import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { playerSchema } from "../schema/playerSchema";

import Input from "./common/Input";
import Button from "./common/Button";
import ImageUpload from "./ImageUpload";

export default function PlayerForm() {

  const {

    register,

    handleSubmit,

    formState: { errors }

  } = useForm({

    resolver: zodResolver(playerSchema)

  });

  function onSubmit(data) {

    console.log(data);

  }

  return (

    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid md:grid-cols-2 gap-6"
    >

      <div>

        <label>Full Name</label>

        <Input
          {...register("fullName")}
        />

        <p className="text-red-500">

          {errors.fullName?.message}

        </p>

      </div>

      <div>

        <label>Phone</label>

        <Input
          {...register("phone")}
        />

        <p className="text-red-500">

          {errors.phone?.message}

        </p>

      </div>

      <div>

        <label>Father Name</label>

        <Input
          {...register("fatherName")}
        />

      </div>

      <div>

        <label>Date Of Birth</label>

        <Input
          type="date"
          {...register("dob")}
        />

      </div>

      <div>

        <label>Role</label>

        <Input
          {...register("role")}
        />

      </div>

      <div>

        <label>Batch</label>

        <Input
          {...register("batch")}
        />

      </div>

      <div>

        <label>Batting Style</label>

        <Input
          {...register("battingStyle")}
        />

      </div>

      <div>

        <label>Bowling Style</label>

        <Input
          {...register("bowlingStyle")}
        />

      </div>

      <div>

        <label>Jersey Number</label>

        <Input
          {...register("jerseyNumber")}
        />

      </div>

      <div className="md:col-span-2">

        <label>Address</label>

        <textarea

          {...register("address")}

          className="w-full border rounded-xl p-3"

        />

      </div>

      <div className="md:col-span-2">

        <ImageUpload />

      </div>

      <div className="md:col-span-2 flex justify-end">

        <Button>

          Register Player

        </Button>

      </div>

    </form>

  );

}
