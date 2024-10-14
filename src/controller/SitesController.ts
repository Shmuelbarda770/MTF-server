import { Request, Response } from 'express';
import Site from '../models/siteModel'; // Assuming the model is in the models folder

// Controller function to delete a site by its ID
export const deleteSite = async (req: Request, res: Response): Promise<void> => {
  try {
    const siteId = req.params.id;
    const deletedSite = await Site.findByIdAndDelete(siteId);

    if (!deletedSite) {
      res.status(404).json({ message: 'Site not found' });
      return; // Exit early if no site found
    }

    res.status(200).json({ message: 'Site deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting site', error });
  }
};
