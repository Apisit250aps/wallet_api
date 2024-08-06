import { Tag, ITag } from "../models/tag.model"
import { Request, Response } from "express"

async function createTag(req: Request<{ body: ITag }>, res: Response) {
  try {
    const { name } = req.body

    const existingTag = await Tag.findOne({ name })

    if (existingTag) {
      return res.status(401).json({ message: "Tag already exists!" })
    }

    const newTag = await Tag.create({ name })
    res.status(201).json(newTag)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function getAllTags(req: Request, res: Response) {
  try {
    const Tags = await Tag.find({})
    res.status(200).json(Tags)
  } catch (error) {
    res.status(500).json(error)
  }
}

async function updateTag(
  req: Request<{ tagId: string; body: ITag }>,
  res: Response
) {
  try {
    const { name } = req.body
    const { tagId } = req.params
    const existingTag = await Tag.findOne({ name })

    if (existingTag) {
      return res.status(401).json({ message: "Tag already exists!" })
    }

    const updateTag = await Tag.findByIdAndUpdate(tagId, { name })

    if (!updateTag) {
      res.status(404).json({ message: "Tag Not Found!" })
    }

    res.status(201).json(updateTag)
  } catch (error) {
    res.status(500).json({ error })
  }
}

export default {
  createTag,
  getAllTags,
  updateTag
}
