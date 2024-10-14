import { Request, Response } from 'express';
import { connect } from '../util/Mongo';
import { createApiResponse } from '../util/ApiResponse';
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

export const getAllSites = async (req: Request, res: Response) => {
  try {
    await connect(); // חיבור למונגו
    const sites = await Site.find(); // שאיבת כל אתרי ה-Site מהמאגר
    if (sites.length > 0) {
      const response = createApiResponse(true, sites, "Fetched all sites successfully", null, null);
      res.status(200).json(response);
    } else {
      const response = createApiResponse(true,sites,"No sites found",null,null);
      res.status(404).json(response); // סטטוס 404 אם לא נמצאו אתרים
    }
  } catch (error: any) {
    console.error('Error fetching sites:', error);
    const response = createApiResponse(false,null,"Failed to fetch sites",null,error.message);
    res.status(500).json(response);
      
  }    
};